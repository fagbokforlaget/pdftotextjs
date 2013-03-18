var shell = require('shelljs');

// we can only do like this because of a bug in shelljs
// global silent
shell.config.silent = true;

function pdftotext (filename, options) {
  this.options = options || {};
  //quote filename
  this.options.additional = ['"' + filename + '"'];

  pdftotext.prototype.add_options = function(optionArray) {
    if (typeof optionArray.length !== undefined) {
        var self = this;
        optionArray.forEach(function(el) {
          if (el.indexOf(' ') > 0) {
            var values = el.split(' ');
            self.options.additional.push(values[0], values[1]);
          } else {
            self.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdftotext.prototype.getSync = function() {
    console.warn("\033[31mgetSync is now obsolete please use getTextSync instead and eventually it will be removed.\033[0m");
    return this.getTextSync();
  }

  pdftotext.prototype.getTextSync = function() {
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    var child = shell.exec('pdftotext ' + self.options.additional.join(' '));
    if (child.code === 0) {
      return child.output;
    }
    else {
      if (!shell.which('pdftotext')) {
        throw new Error('pdftotext (poppler-utils) is missing. Hint: sudo apt-get install poppler-utils');
      }
      throw new Error("pdftotext error: "+ child.output);
    }
  }

  pdftotext.prototype.get = function(options) {
    console.warn("\033[31get is now obsolete please use getText instead and eventually it will be removed.033[31");
    options = options || {};
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    var child = shell.exec('pdftotext ' + self.options.additional.join(' '), function(code, data) {
      if (code === 0) {
        if (self.options.success 
            && typeof self.options.success === "function") {
          self.options.success(data, options);
        }
      }
      else {
        if (!shell.which('pdftotext')) {
          console.error('pdftotext (poppler-utils) is missing. Hint: sudo apt-get install poppler-utils');
        }
        if (self.options.error 
            && typeof self.options.error === "function") {
          self.options.error(data, options);
        }
      }
    });
  };

  pdftotext.prototype.getText = function(cb) {
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    var child = shell.exec('pdftotext ' + self.options.additional.join(' '), function(code, data) {
      if (code === 0) {
        if (cb && typeof cb === "function") {
          cb(null, data, self.options.additional);
        }
      }
      else {
        var err;
        if (!shell.which('pdftotext')) {
          err = new Error('pdftotext (poppler-utils) is missing. Hint: sudo apt-get install poppler-utils');
        }
        else {
          err = new Error(data);
        }
        if (cb && typeof cb === "function") {
          cb(err, data, self.options.addtional);
        }
      }
    });
  }

  pdftotext.prototype.error = function(callback) {
    this.options.error = callback;
    return this;
  };

  pdftotext.prototype.success = function(callback) {
    this.options.success = callback;
    return this;
  };
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdftotext(filename, args);
};
