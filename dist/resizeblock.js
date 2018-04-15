(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["resize"] = factory();
	else
		root["resize"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resizeEle;

var _wwlDom = __webpack_require__(1);

var _wwlDom2 = _interopRequireDefault(_wwlDom);

var _borderbg = __webpack_require__(2);

var _borderbg2 = _interopRequireDefault(_borderbg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var docEle = document.documentElement;

var createFloatPoint = function createFloatPoint() {
    return _wwlDom2.default.create('<div></div>').style({
        position: 'absolute',
        width: '5px',
        height: '5px',
        right: '-3px',
        bottom: '-3px',
        opacity: 0.5,
        backgroundColor: '#333',
        border: '1px #eee solid',
        cursor: 'nwse-resize'
    });
};
var setTargetStyle = function setTargetStyle($target) {
    var targetStyle = {
        border: '1px solid transparent',
        borderImage: 'url(' + _borderbg2.default + ') 1 1 1 repeat',
        userSelect: 'none'
    };
    if ($target.computeStyle().position === 'static') {
        targetStyle.position = 'relative';
    }
    return $target.style(targetStyle);
};
var getSize = function getSize($tar) {

    var width = parseFloat($tar.style('width')),
        height = parseFloat($tar.style('height'));

    if (isNaN(width) || isNaN(height)) {
        var computed = $tar.computeStyle();
        width = parseFloat(computed.width);
        height = parseFloat(computed.height);
    }

    return {
        width: width, height: height
    };
};

/**
 *
 * @param ele           selector|node
 * @param scale {number} width/height
 * @param container     selector|node
 */
function resizeEle(ele) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        scale = _ref.scale,
        container = _ref.container;

    var $target = (0, _wwlDom2.default)(ele);

    if ($target.length === 0) return;

    var $container = (0, _wwlDom2.default)(container);
    if ($container.length === 0) $container = undefined;

    if (typeof scale !== 'number') scale = undefined;

    var $floatPoint = createFloatPoint();

    setTargetStyle($target).append($floatPoint);

    var isDrag = false,
        startSize,
        startPos,
        deltaPos,
        moveSize,
        moveValidSize,
        moveRange;

    $floatPoint.on('mousedown', function (e) {
        isDrag = true;
        startPos = {
            top: e.pageY,
            left: e.pageX
        };

        startSize = getSize($target);

        if ($container) {
            var containerSize = getSize($container);

            var containerBox = $container[0].getBoundingClientRect();
            var tarBox = $target[0].getBoundingClientRect();

            // debugger;

            moveRange = {
                width: containerBox.right - tarBox.left,
                height: containerBox.bottom - tarBox.top
            };
        }

        e.stopPropagation();
    });

    (0, _wwlDom2.default)(docEle).on('mousemove', function (e) {
        if (!isDrag) return;
        deltaPos = {
            top: e.pageY - startPos.top,
            left: e.pageX - startPos.left
        };

        moveSize = {
            width: Math.max(startSize.width + deltaPos.left, 5),
            height: Math.max(startSize.height + deltaPos.top, 5)
        };

        if (scale) {
            moveSize.width = scale * moveSize.height;
        }

        if (moveRange) {
            moveValidSize = {
                width: Math.min(moveSize.width, moveRange.width),
                height: Math.min(moveSize.height, moveRange.height)
            };

            if (scale) {
                if (moveValidSize.width < moveSize.width) {
                    moveValidSize.height = moveValidSize.width / scale;
                } else {
                    moveValidSize.width = moveValidSize.height * scale;
                }
            }

            moveSize = moveValidSize;
        }

        // console.log(moveSize);

        $target.style({
            width: moveSize.width + 'px',
            height: moveSize.height + 'px'
        });

        e.stopPropagation();
    }).on('mouseup', function (e) {

        if (isDrag) {
            isDrag = false;
        }
        e.stopPropagation();
    });
};

// resizeEle('.resize')

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!function(e,n){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var t; }}(this,function(e){"use strict";function n(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=Function.prototype.call,i=o.bind(Array.prototype.slice),u=document.documentElement,c=window,a=function(e){var n=[];return e.forEach(function(e){n.includes(e)||n.push(e)}),n},l=function(e){return e.reduce(function(e,n){return e.concat(n)},[])},f=function(e){var n=e.path||e.composedPath&&e.composedPath();return n&&0!==n.length?n:((n=new v(e.target).parents()).push(window),n)},s=0,h=o.bind(Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var n=(this.document||this.ownerDocument).querySelectorAll(e),t=n.length;--t>=0&&n.item(t)!==this;);return t>-1}),d=o.bind(Element.prototype.closest||function(e){var n=this;if(!document.documentElement.contains(n))return null;do{if(h(n,e))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null}),v=function(){function e(n){var t=this;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e),void 0===n?n=[]:n===window?n=[window]:n.nodeType?n=[n]:Array.isArray(n)||(n=Array.from(n)),this.nodes=n,n.forEach(function(e,n){return t[n]=e}),this.length=n.length}return t(e,[{key:"each",value:function(e){return this.nodes.forEach(e),this}},{key:"map",value:function(e){return this.nodes.map(e)}},{key:"filter",value:function(e){return this.nodes.filter(e)}},{key:"eq",value:function(n){return new e(this.nodes[n])}},{key:"first",value:function(){return this.eq(0)}},{key:"last",value:function(){return this.eq(this.length-1)}},{key:"classNames",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return i(this.nodes[e].classList)}},{key:"addClass",value:function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return this.each(function(e,t){var r;(r=e.classList).add.apply(r,n)})}},{key:"removeClass",value:function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return this.each(function(e,t){var r;(r=e.classList).remove.apply(r,n)})}},{key:"toggleClass",value:function(){for(var e=this,n=arguments.length,t=Array(n),r=0;r<n;r++)t[r]=arguments[r];var o,i,u;return this.nodes[0].classList.toggle?this.each(function(e,n){t.forEach(function(n){e.classList.toggle(n)})}):this.each(function(n,r){o=e.classNames(r),i=[],u=[],t.forEach(function(e){o.includes(e)?i.push(e):u.push(e)}),i.length&&e.removeClass.apply(e,i),u.length&&e.addClass.apply(e,u)})}},{key:"hasClass",value:function(e){return this.nodes.some(function(n){return n.classList.contains(e)})}},{key:"parent",value:function(){return new e(this.map(function(e){return e.parentNode}))}},{key:"parents",value:function(){for(var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=this.nodes[n].parentNode,r=[];t;)r.push(t);return new e(r)}},{key:"children",value:function(){return new e(a(l(this.map(function(e){return i(e.children)}))))}},{key:"find",value:function(n){return new e(a(l(this.map(function(e){return i(e.querySelectorAll(n))}))))}},{key:"includes",value:function(e){return this.nodes.includes(e)}},{key:"closest",value:function(n){return new e(this.nodes.map(function(e){return d(e,n)}))}},{key:"match",value:function(e){return this.nodes.some(function(n){return h(n,e)})}},{key:"val",value:function(e){return void 0===e?this.map(function(e){return e.value||""}).join(""):this.each(function(n){return n.value=e})}},{key:"html",value:function(e){return void 0===e?this[0].innerHTML:this.each(function(n){return n.innerHTML=e})}},{key:"text",value:function(e){return void 0===e?this.map(function(e){return e.innerText}).join(""):this.each(function(n){return n.innerText=e})}},{key:"style",value:function(e,n){var t={};if("string"==typeof e){if(void 0===n)return this[0].style[e];t[e]=n}else{if("object"!==(void 0===e?"undefined":r(e)))return this;t=e}for(var o in t)this.each(function(e){e.style[o]=t[o]});return this}},{key:"computeStyle",value:function(e){return window.getComputedStyle(this.nodes[0],e)}},{key:"maxScroll",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0];return e.scrollHeight-e.clientHeight}},{key:"append",value:function(e){var n,t=this;return e.nodeType?this.each(function(n){n.appendChild(e)}):((n=e)&&"object"===(void 0===n?"undefined":r(n))&&isFinite(n.length)&&n.length>=0&&n.length===Math.floor(n.length)&&n.length<4294967296&&!n.nodeType&&i(e).forEach(function(e){t.append(e)}),this)}},{key:"remove",value:function(){return this.each(function(e){e.parentNode.removeChild(e)})}},{key:"offset",value:function(){var e=this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0].getBoundingClientRect();return{left:e.left+(c.pageXOffset||u.scrollLeft||document.body.scrollLeft)-u.clientLeft,top:e.top+(c.pageYOffset||u.scrollTop||document.body.scrollTop)-u.clientTop}}},{key:"on",value:function(e,n){return this.each(function(t,r){t.addEventListener(e,n),g(t,e,n)})}},{key:"off",value:function(e,n){return this.each(function(t,r){var o=m(t),i={};for(var u in e?i[e]=n?[n]:o[e]:i=o,i)i[u].forEach(function(e){return t.removeEventListener(u,e)});k(t,e,n)})}},{key:"onDelegate",value:function(e,t,r){return this.each(function(o){var u=m(o),c=u[e]&&u[e].find(function(e){return e.isDelegate});if(c){var a=c.cache;a[t]?a[t].push(r):a[t]=[r]}else{var l=function e(n){var t=f(n),r=[],u=e.cache;for(var c in u)r.push({queryNodes:i(o.querySelectorAll(c)),fns:u[c]});var a=t.length;r.forEach(function(e){for(var r=e.queryNodes,o=e.fns,i=function(){var e=t[u];if(r.includes(e))return o.forEach(function(t){t.call(e,n)}),"break"},u=a;u>-1;u--){if("break"===i())break}})};l.cache=n({},t,[r]),l.isDelegate=!0,o.addEventListener(e,l),g(o,e,l)}})}},{key:"offDelegate",value:function(e,t,r){return this.each(function(o){var i=m(o);if(i){var u;if(e){if(!i[e])return;u=n({},e,i[e].filter(function(e){return e.isDelegate}))}else u=function(e,n){var t={};for(var r in e)t[r]=n(e[r],r);return t}(i,function(e){return e.filter(function(e){return e.isDelegate})});if(t)u[e].forEach(function(e){var n=e.cache;if(n[t])if(r){var o=n[t].indexOf(r);n[t].splice(o,1)}else n[t]=void 0});else for(var c in u)u[c].forEach(function(e){o.removeEventListener(c,e),k(o,c,e)})}})}}]),e}(),p={},y=function(e){var n=e._expando_e$id;return n||(n=e._expando_e$id=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:"")+s++}("node")),n},m=function(e){var n=y(e),t=p[n];return t||(t=p[n]={}),t},g=function(e,n,t){var r=m(e);r[n]?r[n].push(t):r[n]=[t]},k=function(e,n,t){var r=y(e),o=p[r];o&&(n||(p[r]=void 0),o[n]&&(t||(o[n]=void 0),o[n]=o[n].filter(function(e){return e!==t}),0===o[n].length&&(o[n]=void 0)))};function E(e){return new v("string"==typeof e?document.querySelectorAll(e):e)}["offset","client","scroll"].forEach(function(e){["Height","Width","Top","Left"].forEach(function(n){var t=e+n;v.prototype[t]=function(){return this[arguments.length>0&&void 0!==arguments[0]?arguments[0]:0][t]}})});var b=document.createElement("div");E.create=function(e){return new v(function(e){b.innerHTML=e;for(var n,t=document.createDocumentFragment();n=b.firstChild;)t.appendChild(n);return t}(e).children)},e.default=E});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "data:image/gif;base64,R0lGODlhCAAIAJEAAKqqqv///wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAAACwAAAAACAAIAAACDZQFCadrzVRMB9FZ5SwAIfkECQoAAAAsAAAAAAgACAAAAg+ELqCYaudeW9ChyOyltQAAIfkECQoAAAAsAAAAAAgACAAAAg8EhGKXm+rQYtC0WGl9oAAAIfkECQoAAAAsAAAAAAgACAAAAg+EhWKQernaYmjCWLF7qAAAIfkECQoAAAAsAAAAAAgACAAAAg2EISmna81UTAfRWeUsACH5BAkKAAAALAAAAAAIAAgAAAIPFA6imGrnXlvQocjspbUAACH5BAkKAAAALAAAAAAIAAgAAAIPlIBgl5vq0GLQtFhpfaIAACH5BAUKAAAALAAAAAAIAAgAAAIPlIFgknq52mJowlixe6gAADs="

/***/ })
/******/ ]);
});