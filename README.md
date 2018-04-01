util.js
前端开发中常用的工具函数
聚焦于抹平兼容性，对一些高频常见操作封装为函数，方便调用。

#Usage 
  <script src="util.min.ja"></script>

#overview

|:------|:------|
|part | function|
|:------|:------|
|part I |isDOMelement(element)|
|       |addClass(element, newClassName)|
|       |removeClass(element, oldClassName)|
|       |hasClass(element, className)|
|       |remove(element)|
|       |empty(element)|
|       |isSiblingNode(element, siblingNode)|
|       |getPosition(element)|
|       |getOffset (element)|
|       |getStyle (element,cssStyle)|
|part II|addEvent(element,eventType,listener)|
|       |removeEvent(element,eventType,listener)|
|       |trigger(element ,eventType,dataObj)|
|part III|Array.prototype.forEach|
|       |Array.prototype.map|
|       |Array.prototype.every|
|       |Array.prototype.some|
|       |Array.prototype.filter|
|       |Array.prototype.reduce|
|       |Array.prototype.reduceRight
|       |Array.prototype.indexOf|
|       |Array.prototype.lastIndexOf|
|       |String.prototype.trim|
|       |Object.keys|
|part IV|ajax(url, options)|
|       |getCookie(name)|
|       |setCookie(name, value, expires, path, domain, secure) |
|       |unSetCookie(name)|
|       |getQueryStringArgs()|
|part V |Array.isArray
|       |isNAN (x)|
|       |isNumeric(n)|
|       |isWindow(obj)|
|       |isEmptyObject(obj)|
|       |isPlainObject(obj)|
|       |uniqArray(arr)|
|       |flatArray(arr)|
|       |getObjectLength(obj)|
|       |isEmpty(source)|
|       |isCardNo(num)|
|       |isTelephone(source)|
|       |isMobilePhone(source)|
|       |isEmail(source)|
|       |isChines(source)|

