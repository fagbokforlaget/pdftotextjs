//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index'),
    pdf = new pdftotext(__dirname +'/../test/pdfs/sample.pdf');

pdf.getText(function(err, stdout, stderr) {
  if (err) {
    console.error(err);
  }
  else {
    console.log("output: " + stdout);
    console.log("stderr: " + stderr);
  }
});

