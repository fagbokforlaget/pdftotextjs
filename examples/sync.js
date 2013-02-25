//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index'),
    ptext = new pdftotext(__dirname +'/../test/pdfs/sample.pdf');

var ret = ptext.getSync();
console.log(ret);
