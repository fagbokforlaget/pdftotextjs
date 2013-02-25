//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index');
var ptext = new pdftotext(__dirname +'/../test/pdfs/sample.pdf', {
  success: function(i) {
    console.log(i);
  },
  error: function(error) {
    console.log("Error: " + error);
  }
});

ptext.get();
