!function(e,t){for(var r in t)e[r]=t[r]}(exports,function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(e,t){e.exports=require("http")},function(e,t){e.exports=require("https")},,,function(e,t,r){"use strict";r.r(t),r.d(t,"handler",function(){return s});const o=r(0);r(1);let n={host:"localhost",port:6970,path:"/auth/getuserdetails",headers:{Authorization:"Basic Y29saW46cGFzc3dvcmQ="}};function s(e,t,r){console.log("queryStringParameters",e.queryStringParameters),o.get(n,function(e){let t="";console.log("Got response: "+e.statusCode),e.on("data",e=>t+=e),e.on("end",()=>{console.log("Successfully processed HTTPS response"),"application/json"===e.headers["content-type"]&&(t=JSON.parse(t)),r(null,{statusCode:200,body:JSON.stringify({data:e.data,statusCode:e.statusCode,statusMessage:e.statusMessage,headers:e.headers,body:t})})})}).on("error",function(e){console.log("Got error: "+e.message),r(null,{statusCode:200,body:JSON.stringify({msg:"Hello, World! err http "+Math.round(10*Math.random())})})})}}]));