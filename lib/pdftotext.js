var shell = require('shelljs');

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
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    var child = shell.exec('pdftotext ' + self.options.additional.join(' '), {async:false, silent:true});
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

  pdftotext.prototype.get = function() {
    var self = this;
    // '-' stdout the output
    self.add_options(['-']);
    var child = shell.exec('pdftotext ' + self.options.additional.join(' '), {async:true, silent:true});
    
    var error = '';
    var ret = '';

    // redirect
    child.stdout.on('data', function(data){
      ret += data;
    });

    child.stderr.on('data', function(data){
      error += data;
    });

    child.on('exit', function(code, signal){
      if (code === 0) {
        if (self.options.success 
            && typeof self.options.success === "function") {
          self.options.success(ret);
        }
      }
      else {
        if (!shell.which('pdftotext')) {
          echo('pdftotext (poppler-utils) is missing. Hint: apt-get install poppler-utils');
        }
        if (self.options.error 
            && typeof self.options.error === "function") {
          self.options.error(error);  
        }
      }

    });
  };

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
