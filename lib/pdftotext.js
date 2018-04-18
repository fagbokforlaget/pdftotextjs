const { execFile, execFileSync } = require('child_process');

class pdftotext {

  constructor(filename, options) {
    this.options = options || {};
    this.options.additional = [filename];
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
    return execFileSync('pdftotext', this.options.additional);
  }

  getText() {
    // '-' stdout the output
    this.add_options(['-']);
    return new Promise((resolve, reject) => {
      execFile('pdftotext', this.options.additional, (error, stdout, stderr) => {
        if (!error) {
          resolve(stdout);
	} else {
          throw error;
	}
      });
    });
  }
}

// module exports
exports = module.exports = function(filename, args) {
  return new pdftotext(filename, args);
};
