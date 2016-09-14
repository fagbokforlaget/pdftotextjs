'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

var pdftotext = function () {
  function pdftotext(filename, options) {
    _classCallCheck(this, pdftotext);

    this.options = options || {};
    this.options.additional = ['"' + filename + '"'];
  }

  _createClass(pdftotext, [{
    key: 'add_options',
    value: function add_options(optionArray) {
      var _this = this;

      if (_typeof(optionArray.length) !== undefined) {
        optionArray.forEach(function (el) {
          if (el.indexOf(' ') > 0) {
            var values = el.split(' ');
            _this.options.additional.push(values[0], values[1]);
          } else {
            _this.options.additional.push(el);
          }
        });
      }
      return this;
    }
  }, {
    key: 'getTextSync',
    value: function getTextSync() {
      // '-' stdout the output
      this.add_options(['-']);
      return execSync('pdftotext ' + this.options.additional.join(' '));
    }
  }, {
    key: 'getText',
    value: function getText(cb) {
      // '-' stdout the output
      this.add_options(['-']);
      exec('pdftotext ' + this.options.additional.join(' '), cb);
    }
  }, {
    key: 'error',
    value: function error(callback) {
      this.options.error = callback;
      return this;
    }
  }, {
    key: 'success',
    value: function success(callback) {
      this.options.success = callback;
      return this;
    }
  }]);

  return pdftotext;
}();

// module exports


exports = module.exports = function (filename, args) {
  return new pdftotext(filename, args);
};