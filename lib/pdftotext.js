require('shelljs/global');

function pdftotext (filename, options) {
  this.options = options || {};
  this.options.additional = [filename];

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

  pdftotext.prototype.get = function() {
    var self = this;
    // '-' stdout the output
    var child = exec('pdftotext ' + self.options.additional.join(' ') + ' -', {async:true, silent:true});
    
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
        if (!which('pdftotext')) {
          echo('Sorry, this script requires pdftotext.');
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
