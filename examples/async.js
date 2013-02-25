//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index'),
    ptext = new pdftotext(__dirname +'/../test/pdfs/sample.pdf');

ptext.success(function(i) {
  console.log(i);
});

ptext.error(function(error) {
  console.log("Error: " + error);
});

ptext.get();
