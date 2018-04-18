## pdftotextjs - pdftotext shell wrapper for Node.js

[![view on npm](http://img.shields.io/npm/v/pdftotextjs.svg)](https://www.npmjs.org/package/pdftotextjs)
[![npm module downloads](http://img.shields.io/npm/dt/pdftotextjs.svg)](https://www.npmjs.org/package/pdftotextjs)
[![Dependency Status](https://david-dm.org/fagbokforlaget/pdftotextjs.svg)](https://david-dm.org/fagbokforlaget/pdftotextjs)
[![Build Status](https://travis-ci.org/fagbokforlaget/pdftotextjs.svg)](https://travis-ci.org/fagbokforlaget/pdftotextjs)
[![Known Vulnerabilities](https://snyk.io/test/github/fagbokforlaget/pdftotextjs/badge.svg)](https://snyk.io/test/github/fagbokforlaget/pdftotextjs)
[![view on npm](http://img.shields.io/npm/l/pdftotextjs.svg)](https://www.npmjs.org/package/pdftotextjs)


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
```javascript
const pdftotext = require('pdftotextjs');
const pdf = new pdftotext('test/pdfs/sample.pdf');

// Convert first page only
// These options will be passed to pdftotext
// You may use any valid option
pdf.add_options(['-f 1', '-l 1']);

pdf.getText()
.then(result) {
  console.log(result);
})
.catch(function (err) {
  console.error(err);
});

```


#### Synchronous example
```javascript
const pdftotext = require('pdftotextjs');
const pdf = new pdftotext('test/pdfs/sample.pdf');

const data = pdf.getTextSync(); // returns buffer
console.log(data.toString('utf8'));
```

### Tests
```
$ npm test
```
