function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=r.parcelRequire8589;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,r){n[e]=r},r.parcelRequire8589=o),o.register("27Lyk",(function(r,t){var n,o;e(r.exports,"register",(()=>n),(e=>n=e)),e(r.exports,"resolve",(()=>o),(e=>o=e));var l={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)l[r[t]]=e[r[t]]},o=function(e){var r=l[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),o.register("jgUcJ",(function(e,r){e.exports=import("./"+o("27Lyk").resolve("5fbcJ")).then((()=>o("6iY2t")))})),o("27Lyk").register(JSON.parse('{"l1gf1":"index.f0c5804e.js","5fbcJ":"kuromoji.c82d710c.js"}'));let l=[];const c=(e,r)=>{const t=l.find((r=>r.word===e));if(t){const e=t.childWords.find((e=>e.word===r));if(e)e.count+=1;else{const e={word:r,count:1};t.childWords.push(e)}}else{const t={word:e,childWords:[{word:r,count:1}]};l.push(t)}return r},i=e=>{const r=l.find((r=>r.word===e));if(r){const e=(e=>{const r=[];return e.forEach((e=>{const t=e.count,n=[...Array(t)].map((()=>e.word));r.push(...n)})),r})(r.childWords);return(t=e)[Math.floor(Math.random()*t.length)]}var t;return null},d=()=>{let e="",r="",t=0;for(;null!==e&&!(t>100);){t++;e=i(e),null!==e&&(r=r.concat(e))}return r},u=e=>{const r=document.createElement("div");r.innerText=e;document.querySelector("#result")?.appendChild(r)};o("jgUcJ").then((e=>{document.querySelector("#analyze")?.addEventListener("click",(()=>{const r=document.querySelector("#result");r&&(r.innerHTML=""),l=[],e.builder({dicPath:"https://cdn.jsdelivr.net/npm/kuromoji@0.1.2/dict/"}).build(((e,r)=>{const t=document.querySelector("#text");t.value.split("\n").forEach((e=>{(e=>{e.reduce(((e,r)=>c(e,r)),"");const r=e.slice(-1)[0];c(r,null)})(r.tokenize(e).map((e=>e.surface_form)))}));for(let e=0;e<10;e++){const e=d();u(e)}}))}))}));
//# sourceMappingURL=index.f0c5804e.js.map