'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    this.settings = Object.assign({
      easing: this._easing,
      offset: 0,
      duration: 400
    }, options);

    this.start, this.distance, this.duration, this.timeStart, this.timeElapsed;
  }

  _createClass(_class, [{
    key: 'scrollTo',
    value: function scrollTo(target) {
      var _this = this;

      var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      this.distance = this._getDistance(target);
      this.start = window.pageYOffset;
      this.duration = instant ? 0 : this.settings.duration;

      // The promise will resolve when the scroll has reached its endpoint.
      return new Promise(function (resolve, reject) {
        requestAnimationFrame(function (time) {
          _this.timeStart = time;
          _this._loop(time, resolve);
        });
      });
    }
  }, {
    key: '_getDistance',
    value: function _getDistance(target) {
      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
        // if the target is a DOM element
        return this.settings.offset + target.getBoundingClientRect().top;
      } else if (typeof target === 'string') {
        // if the target is a selector
        return this.settings.offset + document.querySelector(target).getBoundingClientRect().top;
      } else {
        // if the target is a distance
        return target;
      }
    }
  }, {
    key: '_loop',
    value: function _loop(time, resolve) {
      var _this2 = this;

      this.timeElapsed = time - this.timeStart;
      window.scrollTo(0, this.settings.easing(this.timeElapsed, this.start, this.distance, this.duration));

      if (this.timeElapsed < this.duration) requestAnimationFrame(function (time) {
        return _this2._loop(time, resolve);
      });else this._end(resolve);
    }

    // When the time is up, scroll to the final endpoint and then resolve the promise.

  }, {
    key: '_end',
    value: function _end(resolve) {
      window.scrollTo(0, this.start + this.distance);
      resolve();
    }

    // Easing function. This one is borrowed from JQuery UI.

  }, {
    key: '_easing',
    value: function _easing(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  }]);

  return _class;
}();

exports.default = _class;