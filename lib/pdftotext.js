const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

function pdftotext (filename, options) {
  this.options = options || {};
  //quote filename
  this.options.additional = ['"' + filename + '"'];

  pdftotext.prototype.add_options = function(optionArray) {
    if (typeof optionArray.length !== undefined) {
        optionArray.forEach( el => {
          if (el.indexOf(' ') > 0) {
            let values = el.split(' ');
            this.options.additional.push(values[0], values[1]);
          } else {
            this.options.additional.push(el);
          }
        });
    }
    return this;
  };

  pdftotext.prototype.getTextSync = function() {
    let self = this;
    // '-' stdout the output
    self.add_options(['-']);
    return execSync('pdftotext ' + self.options.additional.join(' '));
  };

  pdftotext.prototype.getText = function(cb) {
    let self = this;
    // '-' stdout the output
    self.add_options(['-']);
    exec('pdftotext ' + self.options.additional.join(' '), cb);
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
