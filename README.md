## pdftotextjs - pdftotext shell wrapper for Node.js
[![Build Status](https://travis-ci.org/fagbokforlaget/pdftotextjs.png)](https://travis-ci.org/fagbokforlaget/pdftotextjs)
pdftotextjs provides access to `pdftotext` via shell in nodejs. You'll
need `pdftotext` which comes with `poppler-utils`.

* Ubuntu/Debian `sudo apt-get install poppler-utils`.
* MacOSX `sudo port install poppler` or `brew install xpdf`.
* Windows `download and install` [Xpdf](http://www.foolabs.com/xpdf/download.html).

### Installation

via npm:

```
$ npm install pdftotextjs
```

### Usage
#### Asynchronous example
```
var pdftotext = require('pdftotextjs'),
    ptext = new pdftotext('test/pdfs/sample.pdf');

ptext.success(function(i) {
  console.log(i);
});

ptext.error(function(error) {
  console.log("Error: " + error);
});

ptext.get();
```
You may also pass callbacks in as object. In that case above can be also re-written as:
```
var pdftotext = require('pdftotextjs');
var ptext = new pdftotext('test/pdfs/sample.pdf', {
  error: function(e) {
    console.log("Error:" + e);
  },
  success: function(data) {
    console.log(data);
  }
});

ptext.get();
```
#### Synchronous example
```
var pdftotext = require('pdftotextjs'),
    ptext = new pdftotext('test/pdfs/sample.pdf');

var data = ptext.getSync();
console.log(data);
```

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

