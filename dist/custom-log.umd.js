var c=Object.defineProperty;var f=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;var u=(o,e,n)=>e in o?c(o,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[e]=n,m=(o,e)=>{for(var n in e||(e={}))y.call(e,n)&&u(o,n,e[n]);if(f)for(var n of f(e))a.call(e,n)&&u(o,n,e[n]);return o};(function(o,e){typeof exports=="object"&&typeof module!="undefined"?e(exports):typeof define=="function"&&define.amd?define(["exports"],e):(o=typeof globalThis!="undefined"?globalThis:o||self,e(o.CustomLog={}))})(this,function(o){"use strict";const e={run:!1,monkeyConsole:{},options:{timestamp:!1},message:function(n){return function(i){return function(){var r,l;n.apply(console,[`${(r=e.options)!=null&&r.timestamp?s():""}${(l=e.options)!=null&&l.prefix?t(String(e.options.prefix)):""}${i!=null&&i.prefix?t(String(i.prefix)):""}${arguments.length>0?"%c%s":"%c "}`,i==null?void 0:i.style].concat(...arguments))}};function s(){return`[${new Date().toLocaleString()}] `}function t(i){return`[${i}]`}},init:(n={timestamp:!1})=>{e.monkeyConsole=m({},console),e.options=n;for(let t of Object.keys(e.monkeyConsole))s(t)&&(window.console[t]=e.message(e.monkeyConsole[t])(n[t]));for(let t of Object.keys(n))s(t)&&(window.console[t]=e.message(e.monkeyConsole[t])(n[t]));e.run=!0,n!=null&&n.hello&&e.message(e.monkeyConsole.log)(n.hello)();function s(t){return e.monkeyConsole.hasOwnProperty(`${t}`)}},end:()=>{var n,s;if(!e.run)throw Error("run int() first...");(n=e.options)!=null&&n.bye&&e.message(e.monkeyConsole.log)((s=e.options)==null?void 0:s.bye)(),window.console=e.monkeyConsole}};o.customLog=e,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
