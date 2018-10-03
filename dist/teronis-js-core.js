(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@teronis-js/event-dispatcher/dist/teronis-js-event-dispatcher.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/@teronis-js/event-dispatcher/dist/teronis-js-event-dispatcher.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else { var i, a; }
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/SingleEvent.ts":
/*!****************************!*\
  !*** ./src/SingleEvent.ts ***!
  \****************************/
/*! exports provided: SingleEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SingleEvent", function() { return SingleEvent; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Presents the class to attach functions and invoke them all at once.
 */
var SingleEvent =
/*#__PURE__*/
function () {
  function SingleEvent() {
    _classCallCheck(this, SingleEvent);

    this.events = [];
  }

  _createClass(SingleEvent, [{
    key: "Add",
    value: function Add(fn) {
      this.events = this.events || [];
      this.events.push(fn);
    }
  }, {
    key: "Remove",
    value: function Remove(fn) {
      if (!this.events) return;

      for (var i = 0; i < this.events.length; i++) {
        if (this.events[i] === fn) {
          this.events.splice(i, 1);
          break;
        }
      }

      ;
    }
  }, {
    key: "Apply",
    value: function Apply(scope, args) {
      if (!this.events) return;
      this.events.forEach(function (fn) {
        return fn.apply(scope, args);
      });
    }
  }, {
    key: "Call",
    value: function Call(scope) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.Apply(scope, args);
    }
  }, {
    key: "Invoke",
    value: function Invoke() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.Apply(undefined, args);
    }
  }]);

  return SingleEvent;
}();

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: SingleEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SingleEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SingleEvent */ "./src/SingleEvent.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SingleEvent", function() { return _SingleEvent__WEBPACK_IMPORTED_MODULE_0__["SingleEvent"]; });



/***/ })

/******/ });
});


/***/ }),

/***/ "./src/HandlerMerger.ts":
/*!******************************!*\
  !*** ./src/HandlerMerger.ts ***!
  \******************************/
/*! exports provided: HandlerMerger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandlerMerger", function() { return HandlerMerger; });
/* harmony import */ var _teronis_js_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @teronis-js/event-dispatcher */ "./node_modules/@teronis-js/event-dispatcher/dist/teronis-js-event-dispatcher.js");
/* harmony import */ var _teronis_js_event_dispatcher__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_teronis_js_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * This class can intercept the execution of passed functions. When you pass a function, you get a proxy
 * function in return that intercepts the execution of the function you passed in the first place.
 */

var HandlerMerger =
/*#__PURE__*/
function () {
  /**
   *
   * @param triggerAtLimit A predetermined length of proxy calls that must proceed to trigger the interception events.
   */
  function HandlerMerger(triggerAtLimit) {
    _classCallCheck(this, HandlerMerger);

    this.preInterceptionEvent = new _teronis_js_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["SingleEvent"]();
    this.postInterceptionEvent = new _teronis_js_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["SingleEvent"]();
    this.triggerAtLimit = triggerAtLimit;
    this.proxies = {};
    this.counter = 0;
  } // getter


  _createClass(HandlerMerger, [{
    key: "getPreInterceptionEvent",
    value: function getPreInterceptionEvent() {
      return this.preInterceptionEvent;
    }
  }, {
    key: "getPostInterceptionEvent",
    value: function getPostInterceptionEvent() {
      return this.postInterceptionEvent;
    }
    /**
     * Get the amount of proxy function calls that has been done so far.
     */

  }, {
    key: "getCounter",
    value: function getCounter() {
      return this.counter;
    } // methods

    /**
     *
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */

  }, {
    key: "mergeWith",
    value: function mergeWith(handler, name) {
      name = this.getFunctionName(handler, name);

      var proxyHandler = this._mergeWith(handler, name);

      return proxyHandler;
    }
    /**
     * The function that has been added previously can be replaced by this method.
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When it is passed, it will be preferred over the name of the passed handler.
     */

  }, {
    key: "replaceMerge",
    value: function replaceMerge(handler, name) {
      name = this.getFunctionName(handler, name);

      if (name in this.proxies) {
        this.proxies[name].revoke();
        delete this.proxies[name];
      }

      var proxyHandler = this._mergeWith(handler, name);

      return proxyHandler;
    }
  }, {
    key: "getFunctionName",
    value: function getFunctionName(handler, name) {
      // the name of handler is by default === ""
      name = name || handler.name;
      if (!name) throw "ArgumentException: @name can not be empty.";
      return name;
    }
    /**
     *
     * @param handler It can only be anonymous, if you pass a name, otherwise an exception will be thrown.
     * @param name When a name is passed, it will be preferred over the name of the passed handler.
     */

  }, {
    key: "_mergeWith",
    value: function _mergeWith(handler) {
      var _this = this;

      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      if (!handler) throw "ArgumentException: @handler can not be null.";
      if (typeof this.proxies[name] !== "undefined") throw "ArgumentException: @name exists already."; // // provide 'this' as variable so that the user can bind 'this' on his own.
      // const self = this;

      var proxyHandler = {
        get: function get(target, property, receiver) {
          return function () {
            this.counter++;
            var fireInterceptionCallbacks = this.getCanTriggerInterceptionEvents();

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            if (fireInterceptionCallbacks) this.preInterceptionEvent.Invoke(args);
            var result = handler.apply(void 0, args);
            if (fireInterceptionCallbacks) this.postInterceptionEvent.Invoke(args);
            return result;
          }.bind(_this);
        }
      }; // wrap handler up with proxy

      var revocable = Proxy.revocable({
        handler: handler
      }, proxyHandler);
      this.proxies[name] = revocable; // Return a wrapper function that points to the proxy function,
      // so that the original function gets called without being intercepted,
      // when the proxy got revoked.

      return function () {
        var _revocable$proxy;

        (_revocable$proxy = revocable.proxy).handler.apply(_revocable$proxy, arguments);
      };
    }
  }, {
    key: "getCanTriggerInterceptionEvents",
    value: function getCanTriggerInterceptionEvents() {
      if (this.triggerAtLimit == null) return this.counter === Object.keys(this.proxies).length;else return this.counter === this.triggerAtLimit;
    }
    /**
     * If a proxy functions gets called, the counter will be increased.
     * With this function you can simply reset the counter to zero.
     */

  }, {
    key: "resetCounter",
    value: function resetCounter() {
      this.counter = 0;
    }
  }]);

  return HandlerMerger;
}();

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: HandlerMerger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HandlerMerger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HandlerMerger */ "./src/HandlerMerger.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HandlerMerger", function() { return _HandlerMerger__WEBPACK_IMPORTED_MODULE_0__["HandlerMerger"]; });



/***/ })

/******/ });
});
//# sourceMappingURL=teronis-js-core.js.map