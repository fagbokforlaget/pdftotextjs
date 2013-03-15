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
    pdf = new pdftotext('test/pdfs/sample.pdf');

// Convert first page only
// These options will be passed to pdftotext
// You may use any valid option
pdf.add_options(['-f 1', '-l 1']);

pdf.getText(function(err, data, cmd) {
  if (err) {
    console.error(err);
  else {
    console.log(data);
    // additionally you can also access cmd array
    // it contains params which passed to pdftotext ['filename', '-f', '1', '-l', '1', '-']
    console.log(cmd.join(' '));
  }
});

```
NOTE: `get` method is now obsolete and not recommended to use it
further. Please use `getText`.


#### Synchronous example
```
var pdftotext = require('pdftotextjs'),
    pdf = new pdftotext('test/pdfs/sample.pdf');

var data = pdf.getTextSync();
console.log(data);
```
NOTE: `getSync` method is now obsolete and not recommended to use it
further. Please use `getTextSync`.

### Tests
```
$ npm test
```

Coverage

```
$ npm test-cov
```

