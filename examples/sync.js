//var pdftotext = require('pdftotextjs'),
var pdftotext = require('../index'),
    ptext = new pdftotext(__dirname +'/../test/pdfs/sample.pdf');

var ret = ptext.getTextSync();
console.log(ret.toString('utf8'));
