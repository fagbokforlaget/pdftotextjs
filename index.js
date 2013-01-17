module.exports = process.env.PDFTEXT_COV
  ? require('./lib-cov/pdftotext')
  : require('./lib/pdftotext');

