!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.mystical=o():t.mystical=o()}(this,function(){return function(t){function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}var n={};return o.m=t,o.c=n,o.i=function(t){return t},o.d=function(t,n,e){o.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},o.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(n,"a",n),n},o.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},o.p="",o(o.s=0)}([function(t,o,n){"use strict";function e(t,o,n,e){"top"===t.pos?d().then(function(){o.style.top=n,o.style.opacity="1"}):d().then(function(){o.style.bottom=e,o.style.opacity="1"})}function i(t){var o=document.createElement("div"),n="position: fixed; height: 100%; width: 100%; top: 0; left: 0; overflow: hidden; background-color: rgba(33,33,33,1.0);";return t.backdrop===!0?o.style.cssText=n+" opacity: 0.48;":o.style.cssText=n+" opacity: 0;",o}function r(t){var o=document.createElement("div");return o.tabIndex=-1,o.style.cssText="background-color: "+t.bg+"; z-index: 99999999; border: none; user-select: none; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); outline: none; cursor: pointer; color: "+t.fg+"; position: fixed; left: 0; padding: 10px; width: 100%; transition: all 0.5s ease; margin: 0 auto; overflow-x: hidden;",o}function c(t,o){var n,e;return"top"===t.pos?(n="0px",e="",o.style.top="-200px"):(n="",e="0%",o.style.bottom="-200px"),{top:n,bottom:e}}function u(t,o,n){"top"===n?t.style.top="-150px":t.style.bottom="-150px",d().then(function(){void 0!==o&&document.body.removeChild(o)}),p(500).then(function(){void 0!==t&&document.body.removeChild(t)})}function d(){return new Promise(function(t){setTimeout(t,0)})}function p(t){return new Promise(function(o){setTimeout(o,t)})}function l(t){return{bg:t.backgroundColor?t.backgroundColor:"#333",fg:t.color?t.color:"#fff",pos:t.position?t.position:"top",backdrop:t.backdrop!==!1,duration:t.duration?t.duration:void 0,posText:t.positiveText?t.positiveText:"Yes",negText:t.negativeText?t.negativeText:"No"}}function s(){return"mystical-"+(Math.floor(9e4*Math.random())+1e4)}Object.defineProperty(o,"__esModule",{value:!0});var a=function(){function t(){}return t.alert=function(t){var o=l(t),n=r(o),d=i(o);document.body.appendChild(d),d.onclick=function(t){t.preventDefault(),u(n,d,o.pos)},n.onclick=function(){u(n,d,o.pos)},n.onkeydown=function(t){13!==t.keyCode&&27!==t.keyCode||u(n,d,o.pos)},n.innerHTML='\n                <div style="position: relative">\n                    '+t.template+"\n                </div>\n        ";var s=c(o,n);document.body.appendChild(n),n.focus(),e(o,n,s.top,s.bottom),void 0!==o.duration&&p(o.duration).then(function(){u(n,d,o.pos)})},t.confirm=function(t){return new Promise(function(o,n){var d=l(t),p=r(d),a=i(d);document.body.appendChild(a),a.onclick=function(t){t.preventDefault(),o(!1),u(p,a,d.pos)},p.onkeydown=function(t){13!==t.keyCode&&27!==t.keyCode||(t.preventDefault(),o(!1),u(p,a,d.pos))};var f=s(),y=s(),b="color: "+d.fg+"; background-color: "+d.bg+"; cursor: pointer; border: none; background: transparent; padding:4px; font-size: 1em;";p.innerHTML='\n                <div style="position: relative">\n                    '+t.template+'\n                    <div style="display:inline-block; text-align: center; margin: auto; width: 100%">\n                        <button id="'+y+'"  style="'+b+'">'+d.negText+'</button>\n                        <button id="'+f+'" style="'+b+'">'+d.posText+"</button>\n                    </div>\n                </div>\n        ";var m=c(d,p);document.body.appendChild(p),document.getElementById(f).onclick=function(t){o(!0),u(p,a,d.pos)};var v=document.getElementById(y);v.onclick=function(t){o(!1),u(p,a,d.pos)},v.focus(),e(d,p,m.top,m.bottom)})},t}();o.Mystical=a}])});