!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.mystical=o():t.mystical=o()}(this,function(){return function(t){function o(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,o),i.l=!0,i.exports}var e={};return o.m=t,o.c=e,o.i=function(t){return t},o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},o.p="",o(o.s=0)}([function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=function(){function t(){}return t.alert=function(t){var o=this,e=this.createDefaultOpts(t),n=document.createElement("div");n.id=this.generateRandomId(),n.tabIndex=-1,n.style.cssText="background-color: "+e.bg+"; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; cursor: pointer; color: "+e.fg+"; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;",n.onclick=function(){o.removeNoteFromDom(n.id,e.pos)},n.onkeydown=function(t){13!==t.keyCode&&27!==t.keyCode||o.removeNoteFromDom(n.id,e.pos)},n.innerHTML='\n                <div style="position: relative">\n                    '+t.template+"\n                </div>\n        ";var i,r;"top"===e.pos?(i="0px",r="",n.style.top="-200px"):(i="",r="0%",n.style.bottom="-200px"),document.body.appendChild(n),n.focus(),"top"===e.pos?this.tick().then(function(){n.style.top=i,n.style.opacity="1"}):this.tick().then(function(){n.style.bottom=r,n.style.opacity="1"})},t.removeNoteFromDom=function(t,o){var e=document.getElementById(t);"top"===o?e.style.top="-150px":e.style.bottom="-150px",this.wait(500).then(function(){document.body.removeChild(e)})},t.tick=function(){return new Promise(function(t){setTimeout(t,0)})},t.wait=function(t){return new Promise(function(o){setTimeout(o,t)})},t.createDefaultOpts=function(t){return{bg:t.backgroundColor?t.backgroundColor:this.bgColor,fg:t.color?t.color:this.fgColor,pos:t.position?t.position:this.position}},t.generateRandomId=function(){return"mystical-"+(Math.floor(9e4*Math.random())+1e4)},t}();n.bgColor="#333",n.fgColor="#fff",n.position="top",o.Mystical=n}])});