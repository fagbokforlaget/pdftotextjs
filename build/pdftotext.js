'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

function pdftotext(filename, options) {
  this.options = options || {};
  //quote filename
  this.options.additional = ['"' + filename + '"'];

  pdftotext.prototype.add_options = function (optionArray) {
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
  };

  pdftotext.prototype.getTextSync = function () {
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    return execSync('pdftotext ' + self.options.additional.join(' '));
  };

  pdftotext.prototype.getText = function (cb) {
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    exec('pdftotext ' + self.options.additional.join(' '), cb);
  };

  pdftotext.prototype.error = function (callback) {
    this.options.error = callback;
    return this;
  };

  pdftotext.prototype.success = function (callback) {
    this.options.success = callback;
    return this;
  };
}

// module exports
exports = module.exports = function (filename, args) {
  return new pdftotext(filename, args);
};