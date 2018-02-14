var TypeWriter = (function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var consume = function consume(promises) {
  var promise = promises[0];

  if (promise) {
    return promise().then(function () {
      return consume(promises.slice(1));
    });
  }

  return Promise.resolve();
};

var TypeWriter = function () {
  function TypeWriter(element) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { pause: 1000, speed: 5 };
    classCallCheck(this, TypeWriter);

    this.element = element;
    this.opts = opts;
    this.stack = [];
    this.speed = (10 - opts.speed) * 10;
  }

  /**
   * Type a string.
   *
   * @param {string} string
   * @param {HTMLElement} element The element to write
   */


  createClass(TypeWriter, [{
    key: "type",
    value: function type(string) {
      var _this = this;

      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.element;

      this.stack.push(function () {
        return new Promise(function (resolve) {
          var timeout = 0;

          string.split("").forEach(function (s, i) {
            timeout += _this.speed;
            setTimeout(function () {
              var className = _this.opts.className || "typewriter";
              var prevTypeWriter = document.querySelector("." + className);

              if (prevTypeWriter) {
                prevTypeWriter.classList.remove(className);
              }

              element.innerHTML += s;
              element.classList.add(className);

              if (string.length === i + 1) {
                resolve();
              }
            }, timeout);
          });
        });
      });

      return this;
    }

    /**
     * Pause the action.
     *
     * @param timeout
     */

  }, {
    key: "pause",
    value: function pause() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.opts.pause;

      this.stack.push(function () {
        return new Promise(function (resolve) {
          setTimeout(resolve, timeout);
        });
      });

      return this;
    }

    /**
     * Delete the text.
     */

  }, {
    key: "delete",
    value: function _delete() {
      var _this2 = this;

      this.stack.push(function () {
        return new Promise(function (resolve) {
          _this2.element.innerHTML = "&#65279;";
          resolve();
        });
      });

      return this;
    }

    /**
     * Start the type writer.
     */

  }, {
    key: "start",
    value: function start() {
      consume(this.stack);
    }

    /**
     * Loop over again and again.
     */

  }, {
    key: "loop",
    value: function loop() {
      var _this3 = this;

      var clone = this.stack.slice(0);

      if (!clone.length) {
        return;
      }

      consume(this.stack).then(function () {
        _this3.stack = clone;
        _this3.loop();
      }).catch(function () {
        // Do nothing
      });
    }
  }]);
  return TypeWriter;
}();

return TypeWriter;

}());
//# sourceMappingURL=bundle.js.map
