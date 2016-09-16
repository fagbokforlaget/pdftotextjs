const exec = require('child_process').exec;
const execSync = require('child_process').execSync;

class pdftotext {
  
  constructor(filename, options) {
    this.options = options || {};
    this.options.additional = ['"' + filename + '"'];
  }

  add_options(optionArray) {
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
  }

  getTextSync() {
    // '-' stdout the output
    this.add_options(['-']);
    return execSync('pdftotext ' + this.options.additional.join(' '));
  }

  getText(cb) {
    // '-' stdout the output
    this.add_options(['-']);
    exec('pdftotext ' + this.options.additional.join(' '), cb);
  }

  error(callback) {
    this.options.error = callback;
    return this;
  }

  success (callback) {
    this.options.success = callback;
    return this;
  }
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdftotext(filename, args);
};
