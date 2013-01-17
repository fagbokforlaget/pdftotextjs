## pdftotextjs - pdftotext shell wrapper for Node.js

pdftotextjs provides access to `pdftotext` via shell in nodejs.

### Installation

via npm:

```
$ npm install pdftotextjs
```

### Usage
```
var pdftotext = require('pdftotextjs'),
    ptext = new pdftotext('tests/pdfs/sample.pdf');

ptext.success(function(i) {
  console.log(i);
});

ptext.error(function(error) {
  console.log("conversion error: " + error);
});

ptext.get();
```

### Tests
```
$ npm test
```

Coverage (Make sure you have installed jscoverage (it's easy `sudo aptitude install jscoverage` or `brew jscoverage`)

```
$ npm test-cov
```

