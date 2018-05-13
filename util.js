
/*cross browsers compatibility utility */
/*part I DOM operaction*/
////// 1.0 judge if a elment is a DOM element
//Chrome,Opera中HTMLElement的类型为function
window.isDOMelement=function(element) {
	if(typeof HTMLElement==="object"||typeof HTMLElement==="function") {
    return element instanceof HTMLElement;
	}
	else {
    return element&& typeof element==='object'&& element.nodeType===1 && typeof element.nodeName==='string';
	}
}
////// 1.1 get DOM element by className
//Chrome,Opera中HTMLElement的类型为function
window.getClass=function(className,element){
	if(arguments[1]!==undefined) {
		if(!isDOMelement(element)){
			console.log("error in getClass(className,element) :arguments[1] must be a Element type!");
      return;
		}
	}
	else {
		var element=document;
	}
	if(document.getElementsByClassName) {
		return element.getElementsByClassName(className);
	}
	else {
		result=[];
		tags=element.getElementsByTagName("*");
		for (var i=0,len=tags.length;i<len;i++){
			var tagClass=tags[i].className;
			tagClassArr=tagClass.split(" ");
			for (var j=0,len=tagClassArr.length;j<len;j++) {
				if (tagClassArr[i]===className){
				  result.push(tags[i]);
				}
			}
		}
		return result;
	}
}
////// 1.2 add className to element
window.addClass=function(element, newClassName) {
	if(!isDOMelement(element)){
	  console.log("error in addClass(element, newClassName) :arguments[0] must be a HTMLElement type!");
    return;
  }
	if(typeof newClassName !=="string" ) return;
  if(document.body.classList) {
  	element.classList.add(newClassName);
  }
  else {
  	var classArr=[];
  	classArr=element.className.trim().split(" ");
  	classArr.push(newClassName);
  	element.className=classArr.join(" ");
  }
}

////// 1.3  remove oldClassName from element
window.removeClass=function(element, oldClassName) {
	if(!isDOMelement(element)){
	  console.log("error in removeClass(element,oldClassName) :arguments[0] must be a Element type!");
    return;
  }
	if(typeof oldClassName !=="string" ) return;
  if(document.body.classList) {
  	element.classList.remove(oldClassName);
  }
  else {
  	var classArr=[]; var result=[];
  	classArr=element.className.trim().split(" ");
  	for(var i=0;i<classArr.length;i++) {
  		if(classArr[i].trim()!==oldClassName) {
  			result.push(classArr[i].trim());
  		}
  	}
  	element.className=result.join(" ");
  }
}
////// 1.4 if element has className?
window.hasClass=function(element, className) {
	if(!isDOMelement(element)){
	  console.log("error in hasClass(element, className) :arguments[0] must be a Element type!");
    return;
  }
	if(typeof className !=="string" ) return;
  if(document.body.classList) {
  	element.classList.contains(className);
  }
  else {
  	var classArr=[]; var result=[];
  	classArr=element.className.trim().split(" ");
  	for(var i=0;i<classArr.length;i++) {
  		if(classArr[i].trim()===className) {
  			return true;
  		}
  	}
  	return false;
  }
}
////// 1.5 remove element
window.remove=function(element) {
	if(!isDOMelement(element)){
	  console.log("error in remove(element) :arguments[0] must be a Element type!");
    return;
  }
	element.parentNode.removeChild(element);
}
////// 1.6 empty childNodes of a element
window.empty=function(element) {
	if(!isDOMelement(element)){
	  console.log("error in empty(element) :arguments[0] must be a Element type!");
    return;
  }
	element.innerHTML="";
}

////// 1.6 if siblingNode is sibling of element
window.isSiblingNode=function(element, siblingNode) {
	if(!isDOMelement(element)){
	  console.log("error in isSiblingNode(element, siblingNode):arguments[0] must be a Element type!");
    return;
  }
   return siblingNode.parentNode.contains(element);
}
////// 1.7 getPosition
window.getPosition=function(element) {
	if(!isDOMelement(element)){
	  console.log("error in getPosition(element) :arguments[0] must be a Element type!");
    return;
  }
  return { left: element.offsetLeft, top: element.offsetTop }
}
////// 1.8 getOffset
window.getOffset=function(element) {
	if(!isDOMelement(element)){
	  console.log("error in getOffset (element) :arguments[0] must be a Element type!");
    return;
  }	
  var box=element.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}
////// 1.9 getStyle
window.getStyle=function(element,cssStyle) {
	if(!isDOMelement(element)){
	  console.log("error in getStyle (element,cssStyle) :arguments[0] must be a Element type!");
    return;
  }		
	if(window.getComputedStyle) {
		var win=element.ownerDocument.defaultView;
		return win.getComputedStyle(element, null)[cssStyle];		
	}
	else {
    return element.currentStyle[cssStyle];		
	}
}
////// 1.10 show
window.show=function(element,displayType) {
  if(!isDOMelement(element)){
    console.log("error in getStyle (element,cssStyle) :arguments[0] must be a Element type!");
    return;
  }
     
  if(displayType) {
    if(typeof displayType!=="string"){
      console.log("error in show (element,displayType) :arguments[1] must be a string!");
      return;
    }    
    element.style.display= displayType; 
  }
  else {
    element.style.display= "block";   
  }
}
////// 1.10 hide
window.hide=function(element) {
  if(!isDOMelement(element)){
    console.log("error in getStyle (element,cssStyle) :arguments[0] must be a Element type!");
    return;
  }   
  element.style.display= "none"; 
}
/*part II cross browsers event*/
window.addEvent=function(element,eventType,listener){
	if(!isDOMelement(element)){
    console.log(element);
    console.log(eventType);
    console.log(listener);
	  console.log("error in addEvent(element,eventType,listener) :arguments[0] must be a Element type!");
    return;
  }		
	if(window.addEventListener) {
	  element.addEventListener(eventType,listener,false);
	}
	else if(window.attachEvent) {
	  element.attachEvent("on"+eventType,function(){
      e=window.event;
      e.target=event.srcElement;
      e.preventDefault=function(e){
        e.returnValue = false;
      }
      e.stopPropagation=function(event){
        e.cancelBubble = true;
      }
      listener(e);
    });
	}
	else {
	  element["on"+eventType]=listener;
	}
}
window.removeEvent=function(element,eventType,listener){
	if(!isDOMelement(element)){
	  console.log("error in removeEvent(element,eventType,listener) :arguments[0] must be a Element type!");
    return;
  }		
	if(window.removeEventListener) {
	 element.removeEventListener(eventType,listener,false);
	}
	else if(window.attachEvent) {
	 element.detachEvent("on"+eventType,listener);
	}
	else {
		 element["on"+eventType]=null;
	}
}
window.trigger=function(element ,eventType,dataObj,bubbles) {
	if(!isDOMelement(element)){
	  console.log("error in trigger(element ,eventType,dataObj) :arguments[0] must be a Element type!");
    return;
  }
  ///默认冒泡	
  if(bubbles==undefined){
    var _bubbles=true;
  }
  else {
    _bubbles=bubbles;
  }
	if (window.CustomEvent) {
	  var event=new CustomEvent(eventType, {detail: dataObj,bubbles:_bubbles});
	} else {
	  var event=document.createEvent('CustomEvent');
	  event.initCustomEvent(eventType, _bubbles, true, dataObj);
	}
	element.dispatchEvent(event);
}


/*part III ecma5 shim*/
if (typeof Array.prototype.forEach!=="function") {
	Array.prototype.forEach=function(callback,thisArg){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var T;
    if (arguments.length > 1) {
      T=thisArg;
    }

    for(var index=0;index<len;index++){
    	var val;
       if(index in this_arr) {
       	val=this_arr[index];
       	callback.call(T, val,index,this_arr);
       }
    }

	}
}

if (typeof Array.prototype.map!=="function") {
	Array.prototype.map=function(callback,thisArg){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var T;
    if (arguments.length > 1) {
      T=thisArg;
    }
    var result=new Array(len);
    for(var index=0;index<len;index++){
    	var val;
       if(index in this_arr) {
       	val=this_arr[index];
       	result[index]=callback.call(T, val,index,this_arr);
       }
    }
    return result;
	}
}

if (typeof Array.prototype.every!=="function") {
	Array.prototype.every=function(callback,thisArg){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var T;
    if (arguments.length > 1) {
      T=thisArg;
    }
    var result=false;
    for(var index=0;index<len;index++){
    	var val;
       if(index in this_arr) {
       	val=this_arr[index];
       	result=callback.call(T, val,index,this_arr);
       	if(result===false) return false;
       }
    }
    return true;
	}
}

if (typeof Array.prototype.some!=="function") {
	Array.prototype.some=function(callback,thisArg){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var T;
    if (arguments.length > 1) {
      T=thisArg;
    }
    var result;
    for(var index=0;index<len;index++){
    	var val;
       if(index in this_arr) {
       	val=this_arr[index];
       	result=callback.call(T, val,index,this_arr);
       	if(result===true) return true;
       }
    }
    return false;
	}
}

if (typeof Array.prototype.filter!=="function") {
	Array.prototype.filter=function(callback,thisArg){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var T;
    if (arguments.length > 1) {
      T=thisArg;
    }
    var result=[]; var j=0
    for(var index=0;index<len;index++){
    	var val;
       if(index in this_arr) {
       	val=this_arr[index];
       	result=callback.call(T, val,index,this_arr);
       	if(result===true) result.push(val);
       }
    }
    return result;
	}
}

if (typeof Array.prototype.reduce!=="function") {
	Array.prototype.reduce=function(callback,initialValue){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var val; var index=0;
    if (arguments.length > 1) {
      val=initialValue;
    }
    else {
    	while(index<len&&!(index in this_arr)){
    		index++;
    	}
    	if(index>=len) {
	       throw new TypeError( 'Reduce of empty array ' +
      'with no initial value' );
    	}
    	val=this_arr[index++];
    }
    var result;
    for(;index<len;index++){
        val=callback(val,this_arr[index],index,this_arr);
    }
    return val;
	}
}

if (typeof Array.prototype.reduceRight!=="function") {
	Array.prototype.reduceRight=function(callback,initialValue){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var val; var index=len-1;
    if (arguments.length > 1) {
      val=initialValue;
    }
    else {
    	while(index>0&&!(index in this_arr)){
    		index--;
    	}
    	if(index<0) {
	       throw new TypeError( 'Reduce of empty array ' +
      'with no initial value' );
    	}
    	val=this_arr[index--];
    }
    var result;
    for(;index>=0;index--){
        val=callback(val,this_arr[index],index,this_arr);
    }
    return val;
	}
}

if (typeof Array.prototype.indexOf!=="function") {
	Array.prototype.indexOf=function(searchElement,fromIndex){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var start_index; 
    if (arguments.length > 1) {
    	if(fromIndex>len-1) return -1;
    	if(fromIndex<0) {
    		start_index=len+fromIndex;
    		if(start_index<0) start_index=0;
    	}
      start_index=fromIndex;
    }
    else {
      start_index=0;
    }
    var result;
    for(index=start_index;index<len;index++){
       if(this_arr[index]===searchElement) return index;
    }
    return -1;
	}
}

if (typeof Array.prototype.lastIndexOf!=="function") {
	Array.prototype.lastIndexOf=function(searchElement,fromIndex){
		if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var this_arr=Object(this);
    var len=this_arr.length>>>0;
    var start_index; 
    if (arguments.length > 1) {
    	if(fromIndex>=len) {
    		start_index=len-1;
    	}
    	if(fromIndex<0) {
    		start_index=len+fromIndex;
    		if(start_index<0) return -1;
    	}
      start_index=fromIndex;
    }
    else {
      start_index=len-1;
    }
    var result;
    for(index=start_index;index>=0;index--){
       if(this_arr[index]===searchElement) return index;
    }
    return -1;
	}
}

if (!String.prototype.trim) {
  String.prototype.trim=function() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if (!Object.keys) {
  Object.keys=(function() {
    'use strict';
    var hasOwnProperty=Object.prototype.hasOwnProperty,
        hasDontEnumBug=!({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums=[
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength=dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result=[], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i=0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}
/*part IV ajax cookie location*/
window.createXHR=function() {
	if(window.XMLHttpRequest){
    return new XMLHttpRequest();
  }else{
    return new ActiveXObject('Microsoft.XMLHTTP');
  }
  
}
///// ajax 示例 
// ajax(
//   'http://localhost:8080/server/ajaxtest', 
//   {
//	    method:"GET";
//      data: {
//             name: 'simon',
//             password: '123456'
//      },
//      onsuccess: window.(responseText, xhr) {
//        console.log(responseText);
//      }
//   }
// );
window.ajax=function(url, options) {
  var xhr=createXHR();
  xhr.onreadystatechange=function() {
  	if(xhr.readyState===4) {
  		if(xhr.status>=200&&xhr.status<300||xhr.status===304) {
  			options.success(xhr);
  		}
  		else {
  			options.error(xhr.responseText);
  		}
  	}
  }
  if(options==null||options.method===undefined||options.method==="GET"){
    xhr.open("GET",url);
    xhr.send(null);
  }
  else {
    if(typeof options.method==="string"){   
      xhr.open(options.method,url);
      xhr.send(options.date);
    }    
  }
}

// 获取cookie值
window.getCookie=function(name) {
  var cookieName=encodeURIComponent(name)+"=",
	cookieStart=document.cookie.indexOf(cookieName),
	cookieValue=null;
	if (cookieStart>-1){
	  var cookieEnd=document.cookie.indexOf(";", cookieStart);
	  if (cookieEnd==-1){
	    cookieEnd=document.cookie.length;
	  }
	  cookieValue=decodeURIComponent(document.cookie.substring(cookieStart
	              +cookieName.length, cookieEnd));
	}
	return cookieValue;
}

// setcookie
window.setCookie=function(name, value, expires, path, domain, secure) {
  var cookieText=encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(expires instanceof Date) {
	  cookieText += "; expires=" + expires.toGMTString();
	}
	if(path) {
		cookieText += "; path=" + path;
	}
	if(domain) {
	  cookieText += "; domain=" + domain;
	}
	if(secure) {
	  cookieText += "; secure";
	}
	document.cookie=cookieText;
}
// unsetcookie
window.unSetCookie=function(name) {
  setCookie(name, "", new Date(0));
}
// getQueryStringArgs of location.search
window.getQueryStringArgs=function(){
  var qs=(location.search.length > 0 ? location.search.substring(1) : "");
  var args={},
  items=qs.length ? qs.split("&") : [],
  item=[],
  name,cookieValue;

	for (var i=0; i<items.length; i++){
	  item=items[i].split("=");
	  name=decodeURIComponent(item[0]);
	  value=decodeURIComponent(item[1]);
		if(name.length) {
		  args[name]=value;
		}
	}
  return args;
}

/*part V util window.*/
/////5.1 detect type
/////5.1.1 isArray
if (!Array.isArray) {
  Array.isArray=function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
/////5.1.2 isFunction
window.isFunction=function(item) {
  if (typeof item === 'function') {
    return true;
  }
  var type=Object.prototype.toString(item);
  return type === '[object Function]' || type === '[object GeneratorFunction]';
}
/////5.1.3 isNAN
window.isNAN=function(x) {
	return x!==x;
}
/////5.1.4 isNumeric
window.isNumeric=function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
/////5.1.5 isWindow
window.isWindow=function(obj) {
  return obj !== null && obj !== undefined && obj === obj.window;
}
/////5.1.6 isEmptyObject
window.isEmptyObject=function(obj) {
  return Object.keys(obj).length === 0;
}
/////5.1.7 isPlainObject(create by {} or newObject())
window.isPlainObject=function(obj) {
  if (typeof (obj) !== 'object' || obj.nodeType || obj !== null && obj !== undefined && obj === obj.window) {
    return false;
  }
  if (obj.constructor &&
      !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false;
  }
  return true;
}
/////5.2 object operation
/////5.2.1 
window.uniqArray=function(arr) {
  if(!arr instanceof Array) {
  	console.log("window.uniqArray need a array input!")
  	return;
  }
  var result=[]
  for(var i=0; i<arr.length; i++){
    if(result.indexOf(arr[i])==-1){
      result.push(arr[i])
    }
  }
  return result;
}

/////5.2.2
window.flatArray=function(arr) {
  var newArr =[];
  for(var i= 0; i < arr.length; i++){
      if(arr[i] instanceof Array){
          newArr=newArr.concat(Flat5(arr[i]));
          // newArr.push.apply(newArr, Flat5(arr[i]));
      }else{
          newArr.push(arr[i]);
      }
  }
  return newArr;
}

/////5.2.3
window.getObjectLength=function(obj) {
	var len=0;
	for(var i in obj) {
		if(obj.hasOwnproperty(i)) len++;
	}
	return len;
}
/////判断字符串是否为空，若为空则返回true否则返回false  
window.isEmpty=function(source){  
    var str=source.replace(/(^\s*)|(\s*$)/g,"");  
    if(str=="" || str.toLowerCase()=="null" || str.length<=0){  
        return true;  
    }else{  
        return false;  
    }  
}  
/////5.3 confirm
/////5.3.1 验证身份证号是否正确 
window.isCardNo=function(num){  
    if(isNaN(num)){  
        alert("输入的身份证号不是数字！");  
        return false;  
    }  
    var len=num.length;  
    if(len<15 || len>18){  
        alert("输入的身份证号码长度不正确定！应为15位或18位");  
        return false;  
    }  
    var re15=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;  
    var re18=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;  
    var res=(re15.test(num) || re18.test(num));  
    if(res==false){  
        alert("输入的身份证号格式不正确！");  
        return false;  
    }  
    return res;  
} 
/////5.3.2 验证是否为电话号码（座机）   
window.isTelephone=function(source) {  
    var regex=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/  
    return regex.test(source);  //search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1  
}  
  
/////5.3.3 验证是否为手机号码（移动手机） 

window.isMobilePhone=function(source) {  
    var regex=/^((\d3\d3)|(\d{3}\-))?1\d{10}/;  
    return regex.test(source);  
}  
  
/////5.3.1 验证是否为电子邮箱 

window.isEmail=function(source) {  
    var regex=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;  
    if(source.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1){  
        return true;  
    }else{  
        alert("电子邮箱格式不正确");  
        return false;  
    }  
} 

/////5.3.4 验证身份证号是否正确 验证字符串是否是中文 
window.isChines=function(source){  
    var regex=/^[\u4E00-\u9FA5]+$/;  
    return regex.test(source);  
}  

console.log("hello!!!!")