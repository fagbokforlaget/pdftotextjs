module.exports = process.env.PDFTOTEXT_COV
  ? require('./lib-cov/pdftotext')
  : require('./build/pdftotext');

