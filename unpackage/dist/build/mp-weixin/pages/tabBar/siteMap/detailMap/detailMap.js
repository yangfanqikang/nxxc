(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabBar/siteMap/detailMap/detailMap"],{9653:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={data:function(){return{title:"map",latitude:39.909,longitude:116.39742,covers:[{latitude:39.909,longitude:116.39742,iconPath:"../../../../static/location@3x.png",title:"阿打算",label:{content:"文本1",color:"#F76350",anchorX:0,anchorY:-80,bgColor:"#fff",padding:5,borderWidth:1,borderColor:"#D84C29",textAlign:"right"},callout:{content:"地点1",color:"#F76350",fontSize:12,borderRadius:5}},{latitude:39.9,longitude:116.39,iconPath:"../../../../static/location@3x.png",title:"阿迪达斯",x:39.9,y:116.399,label:{content:"文本2",color:"#F76350",bgColor:"#fff",padding:5,borderRadius:4},callout:{content:"地点2",color:"#F76350",fontSize:12}}],scale:15,controls:[{id:1,iconPath:"../../../../static/location@3x.png",position:{left:15,top:15,width:50,height:50}}],circles:[{latitude:39.9,longitude:116.39,fillColor:"#FFC41F",color:"#12A1DD",radius:50,strokeWidth:2}],polyline:[{points:[{latitude:39.909,longitude:116.39742},{latitude:39.9,longitude:116.39}],color:"#0000AA",width:2,dottedLine:!0,arrowLine:!0}]}},onLoad:function(){t.getLocation({type:"wgs84",success:function(t){console.log("当前位置的经度："+t.longitude),console.log("当前位置的纬度："+t.latitude)}})}};o.default=n}).call(this,n("543d")["default"])},a6a7:function(t,o,n){"use strict";n.r(o);var e=n("9653"),i=n.n(e);for(var l in e)"default"!==l&&function(t){n.d(o,t,function(){return e[t]})}(l);o["default"]=i.a},ac91:function(t,o,n){"use strict";n.r(o);var e=n("e84d"),i=n("a6a7");for(var l in i)"default"!==l&&function(t){n.d(o,t,function(){return i[t]})}(l);var a=n("2877"),c=Object(a["a"])(i["default"],e["a"],e["b"],!1,null,null,null);o["default"]=c.exports},e84d:function(t,o,n){"use strict";var e=function(){var t=this,o=t.$createElement;t._self._c},i=[];n.d(o,"a",function(){return e}),n.d(o,"b",function(){return i})}},[["e4b7","common/runtime","common/vendor"]]]);