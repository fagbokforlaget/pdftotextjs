//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index'),
    pdf = new pdftotext(__dirname +'/../test/pdfs/sample.pdf');

pdf.getText(function(err, data, cmd) {
  if (err) {
    console.error(err);
  }
  else {
    console.log(data);
    // additionally you can also access cmd array
    // it contains params which passed to pdftotext ['filename', '-f', '1', '-']
    console.log("\n\nFollowing options were used to convert this pdf to text:");
    console.log(cmd.join(' '));
  }
});

