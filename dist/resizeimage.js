!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.resize=t():e.resize=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){var r,o,i;o=[t],void 0===(i="function"==typeof(r=function(e){"use strict";function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Function.prototype.call,i=o.bind(Array.prototype.slice),u=document.documentElement,a=window,c=function(e){var t=[];return e.forEach(function(e){t.includes(e)||t.push(e)}),t},l=function(e){return e.reduce(function(e,t){return e.concat(t)},[])},f=0,s=o.bind(Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;--n>=0&&t.item(n)!==this;);return n>-1}),h=o.bind(Element.prototype.closest||function(e){var t=this;if(!document.documentElement.contains(t))return null;do{if(s(t,e))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}),d=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===t?t=[]:t===window?t=[window]:t.nodeType?t=[t]:Array.isArray(t)||(t=Array.from(t)),this.nodes=t,t.forEach(function(e,t){return n[t]=e}),this.length=t.length}return n(e,[{key:"each",value:function(e){return this.nodes.forEach(e),this}},{key:"map",value:function(e){return this.nodes.map(e)}},{key:"filter",value:function(e){return this.nodes.filter(e)}},{key:"eq",value:function(t){return new e(this.nodes[t])}},{key:"first",value:function(){return this.eq(0)}},{key:"last",value:function(){return this.eq(this.length-1)}},{key:"classNames",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return i(this.nodes[e].classList)}},{key:"addClass",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.each(function(e,n){var r;(r=e.classList).add.apply(r,t)})}},{key:"removeClass",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.each(function(e,n){var r;(r=e.classList).remove.apply(r,t)})}},{key:"toggleClass",value:function(){for(var e=this,t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];var o,i,u;return this.nodes[0].classList.toggle?this.each(function(e,t){n.forEach(function(t){e.classList.toggle(t)})}):this.each(function(t,r){o=e.classNames(r),i=[],u=[],n.forEach(function(e){o.includes(e)?i.push(e):u.push(e)}),i.length&&e.removeClass.apply(e,i),u.length&&e.addClass.apply(e,u)})}},{key:"hasClass",value:function(e){return this.nodes.some(function(t){return t.classList.contains(e)})}},{key:"parent",value:function(){return new e(this.map(function(e){return e.parentNode}))}},{key:"parents",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.nodes[t].parentNode,r=[];n;)r.push(n);return new e(r)}},{key:"children",value:function(){return new e(c(l(this.map(function(e){return i(e.children)}))))}},{key:"find",value:function(t){return new e(c(l(this.map(function(e){return i(e.querySelectorAll(t))}))))}},{key:"includes",value:function(e){return this.nodes.includes(e)}},{key:"closest",value:function(t){return new e(this.nodes.map(function(e){return h(e,t)}))}},{key:"match",value:function(e){return this.nodes.some(function(t){return s(t,e)})}},{key:"val",value:function(e){return void 0===e?this.map(function(e){return e.value||""}).join(""):this.each(function(t){return t.value=e})}},{key:"html",value:function(e){return void 0===e?this[0].innerHTML:this.each(function(t){return t.innerHTML=e})}},{key:"text",value:function(e){return void 0===e?this.map(function(e){return e.innerText}).join(""):this.each(function(t){return t.innerText=e})}},{key:"style",value:function(e,t){var n={};if("string"==typeof e){if(void 0===t)return this[0].style[e];n[e]=t}else{if("object"!==(void 0===e?"undefined":r(e)))return this;n=e}for(var o in n)this.each(function(e){e.style[o]=n[o]});return this}},{key:"computeStyle",value:function(e){return window.getComputedStyle(this.nodes[0],e)}},{key:"maxScroll",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0];return e.scrollHeight-e.clientHeight}},{key:"append",value:function(e){var t,n=this;return e.nodeType?this.each(function(t){t.appendChild(e)}):((t=e)&&"object"===(void 0===t?"undefined":r(t))&&isFinite(t.length)&&t.length>=0&&t.length===Math.floor(t.length)&&t.length<4294967296&&!t.nodeType&&i(e).forEach(function(e){n.append(e)}),this)}},{key:"remove",value:function(){return this.each(function(e){e.parentNode.removeChild(e)})}},{key:"offset",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0].getBoundingClientRect();return{left:e.left+(a.pageXOffset||u.scrollLeft||document.body.scrollLeft)-u.clientLeft,top:e.top+(a.pageYOffset||u.scrollTop||document.body.scrollTop)-u.clientTop}}},{key:"on",value:function(e,t){return this.each(function(n,r){n.addEventListener(e,t),g(n,e,t)})}},{key:"off",value:function(e,t){return this.each(function(n,r){var o=v(n),i={};for(var u in e?i[e]=t?[t]:o[e]:i=o,i)i[u].forEach(function(e){return n.removeEventListener(u,e)});y(n,e,t)})}},{key:"onDelegate",value:function(e,n,r){return this.each(function(o){var u=v(o),a=u[e]&&u[e].find(function(e){return e.isDelegate});if(a){var c=a.cache;c[n]?c[n].push(r):c[n]=[r]}else{var l=function e(t){var n=function(e){var t=e.path||e.composedPath&&e.composedPath();return t&&0!==t.length?t:((t=new d(e.target).parents()).push(window),t)}(t),r=[],u=e.cache;for(var a in u)r.push({queryNodes:i(o.querySelectorAll(a)),fns:u[a]});var c=n.length;r.forEach(function(e){for(var r=e.queryNodes,o=e.fns,i=function(){var e=n[u];if(r.includes(e))return o.forEach(function(n){n.call(e,t)}),"break"},u=c;u>-1&&"break"!==i();u--);})};l.cache=t({},n,[r]),l.isDelegate=!0,o.addEventListener(e,l),g(o,e,l)}})}},{key:"offDelegate",value:function(e,n,r){return this.each(function(o){var i=v(o);if(i){var u;if(e){if(!i[e])return;u=t({},e,i[e].filter(function(e){return e.isDelegate}))}else u=function(e,t){var n={};for(var r in e)n[r]=t(e[r]);return n}(i,function(e){return e.filter(function(e){return e.isDelegate})});if(n)u[e].forEach(function(e){var t=e.cache;if(t[n])if(r){var o=t[n].indexOf(r);t[n].splice(o,1)}else t[n]=void 0});else for(var a in u)u[a].forEach(function(e){o.removeEventListener(a,e),y(o,a,e)})}})}}]),e}(),p={},A=function(e){var t=e._expando_e$id;return t||(t=e._expando_e$id=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+f++}("node")),t},v=function(e){var t=A(e),n=p[t];return n||(n=p[t]={}),n},g=function(e,t,n){var r=v(e);r[t]?r[t].push(n):r[t]=[n]},y=function(e,t,n){var r=A(e),o=p[r];o&&(t||(p[r]=void 0),o[t]&&(n||(o[t]=void 0),o[t]=o[t].filter(function(e){return e!==n}),0===o[t].length&&(o[t]=void 0)))};function m(e){return new d("string"==typeof e?document.querySelectorAll(e):e)}["offset","client","scroll"].forEach(function(e){["Height","Width","Top","Left"].forEach(function(t){var n=e+t;d.prototype[n]=function(){return this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0][n]}})});var w=document.createElement("div");m.create=function(e){return new d(function(e){w.innerHTML=e;for(var t,n=document.createDocumentFragment();t=w.firstChild;)n.appendChild(t);return n}(e).children)},e.default=m})?r.apply(t,o):r)||(e.exports=i)},function(e,t){e.exports="data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg+ELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm+rQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg+EhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs="},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.scale,o=t.container,i=(0,r.default)(e);if(0===i.length)return;var f=(0,r.default)(o);0===f.length&&(f=void 0);"number"!=typeof n&&(n=void 0);var s=a();c(i).append(s);var h,d,p,A,v,g,y=!1;s.on("mousedown",function(e){if(y=!0,d={top:e.pageY,left:e.pageX},h=l(i),f){l(f);var t=f[0].getBoundingClientRect(),n=i[0].getBoundingClientRect();g={width:t.right-n.left,height:t.bottom-n.top}}e.stopPropagation()}),(0,r.default)(u).on("mousemove",function(e){y&&(p={top:e.pageY-d.top,left:e.pageX-d.left},A={width:Math.max(h.width+p.left,5),height:Math.max(h.height+p.top,5)},n&&(A.width=n*A.height),g&&(v={width:Math.min(A.width,g.width),height:Math.min(A.height,g.height)},n&&(v.width<A.width?v.height=v.width/n:v.width=v.height*n),A=v),i.style({width:A.width+"px",height:A.height+"px"}),e.stopPropagation())}).on("mouseup",function(e){y&&(y=!1),e.stopPropagation()})};var r=i(n(0)),o=i(n(1));function i(e){return e&&e.__esModule?e:{default:e}}var u=document.documentElement,a=function(){return r.default.create("<div></div>").style({position:"absolute",width:"5px",height:"5px",right:"-3px",bottom:"-3px",opacity:.5,backgroundColor:"#333",border:"1px #eee solid",cursor:"nwse-resize"})},c=function(e){var t={border:"1px solid transparent",borderImage:"url("+o.default+") 1 1 1 repeat",userSelect:"none"};return"static"===e.computeStyle().position&&(t.position="relative"),e.style(t)},l=function(e){var t=parseFloat(e.style("width")),n=parseFloat(e.style("height"));if(isNaN(t)||isNaN(n)){var r=e.computeStyle();t=parseFloat(r.width),n=parseFloat(r.height)}return{width:t,height:n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var i,f,s=(0,o.default)(e);u(t).then(function(e){return l(i=e)}).then(function(e){var t=e.width,o=e.height;f=t/o;var u=a(s),l=c({width:t,height:o},u);s.style({width:l.width+"px",height:l.height+"px",backgroundImage:"url("+i+")",backgroundSize:"100% 100%"}),(0,r.default)(s[0],{container:n,scale:f})})};var r=i(n(2)),o=i(n(0));function i(e){return e&&e.__esModule?e:{default:e}}var u=function(e){return"string"==typeof e?Promise.resolve(e):new Promise(function(t){var n=new FileReader;n.readAsDataURL(e),n.onload=function(){t(n.result)}})},a=function(e){var t=parseFloat(e.style("width")),n=parseFloat(e.style("height"));if(isNaN(t)||isNaN(n)){var r=e.computeStyle();t=parseFloat(r.width),n=parseFloat(r.height)}return{width:t,height:n}},c=function(e,t){var n=t.width/e.width*e.height;return n<=t.height?{width:t.width,height:n}:{width:t.height/e.height*e.width,height:t.height}},l=function(e){var t=new Image;return new Promise(function(n,r){t.onload=function(){n({width:t.width,height:t.height})},t.onerror=r,t.src=e})}}])});