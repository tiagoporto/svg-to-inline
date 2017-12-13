/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(4);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _domready = __webpack_require__(2);

var _domready2 = _interopRequireDefault(_domready);

var _svgToInline = __webpack_require__(3);

var _svgToInline2 = _interopRequireDefault(_svgToInline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _domready2.default)(function () {
  // Executes after dow ready
});

(0, _svgToInline2.default)();

// svgToInline('.svg')

// svgToInline('#svg')

// svgToInline({
//   elementsClass: 'svg',
//   useTriggerClass: false,
//   preserveComments: false
// })

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (true) module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * replace tags to inline SVG
 * @param  {object} options [description]
 * @return {undefined} This function dont have return
 */
var svgToInline = function svgToInline(options) {
  var trigger = '';
  var elements = [];

  if (options) {
    //   if (typeof options === 'string') {
    //     trigger.element = options
    //   } else if (typeof options === 'object') {
    //     trigger = options
    // }

    //   elements = document.getElementsByClassName(trigger.element)
  } else {
    // If there isn't option will get all images and objects on the page with SRC is .svg extension
    elements = Array.prototype.concat.apply(elements, document.getElementsByTagName('img'), elements);
    elements = Array.prototype.concat.apply(elements, document.getElementsByTagName('object'), elements);

    for (var i = elements.length - 1; i >= 0; i -= 1) {
      var file = elements[i].getAttribute('src') || elements[i].getAttribute('data');

      if (file.search('.svg') < 0) {
        elements.splice(i, 1);
      }
    }
  }

  if (elements.length) {
    Array.from(elements).forEach(function (item) {
      var svg = {
        current: item,
        oldClass: '',
        newClass: '',
        path: item.getAttribute('data') || item.getAttribute('src')
      };
      var requestDetails = {
        element: '',
        svgTag: '',
        svgTagWithoutClass: ''

        // Get class names
      };var inputClass = svg.current.getAttribute('class').split(' ');

      inputClass.forEach(function (item, index) {
        var space = '';

        // check if isn't the last class
        if (inputClass[index] === trigger.class && !trigger.useClass) {
          return;
        }

        index !== inputClass.length - 1 && (space = ' ');
        svg.newClass += inputClass[index] + space;
      });

      var request = new XMLHttpRequest();
      request.open('GET', svg.path, true);

      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            var response = this.responseText;

            // Remove comments
            requestDetails.element = response.replace(/<[?!][\s\w"-/:=?]+>/g, '');

            requestDetails.svgTag = requestDetails.element.match(/<svg[\w\s\t\n:="\\'/.#-]+>/g);
            requestDetails.svgTagWithoutClass = requestDetails.svgTag[0].replace(/class="[\w\s-_]+"/, '');
            svg.oldClass = requestDetails.svgTag[0].match(/class="(.*?)"/);

            // If exist class in svg add to svg.newClass
            svg.oldClass && svg.oldClass[1] && svg.newClass && (svg.newClass = svg.oldClass[1] + ' ' + svg.newClass);

            svg.newClass !== '' && (svg.newClass = 'class="' + svg.newClass + '"');

            requestDetails.svgTagWithoutClass = requestDetails.svgTagWithoutClass.replace('>', ' ' + svg.newClass + '>');

            svg.current.outerHTML = requestDetails.element.replace(/<svg[\w\s\t\n:="\\'/.#-]+>/g, requestDetails.svgTagWithoutClass);
          } else {
            console.error('Conection Error');
          }
        }
      };

      request.send();
      request = null;
    });

    return;
  }

  return console.error('SvgToInline needs parameters, try svgToInline(\'.class|#id\') or svgToInline({element:\'.class|#id\'})');
};

exports.default = svgToInline;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (undefined === 'production') {
  /* eslint-disable */
  // Google Analytics: change UA-XXXXX-X to be your site's ID.
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();a = s.createElement(o), m = s.getElementsByTagName(o)[0];a.async = 1;a.src = g;m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-XXXXXXXX-X', 'auto');
  ga('send', 'pageview');
}

/***/ })
/******/ ]);