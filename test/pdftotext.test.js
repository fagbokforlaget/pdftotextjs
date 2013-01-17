var assert = require('assert'),
    fs = require('fs'),
    pdftotext = require('../lib/pdftotext.js');

describe('pdftotext', function(){
  describe('add_options', function(){
    it('should add options', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');
      ptext.add_options(['-raw', '-f 1', 'l 1', '-']);
      assert.equal(1, ptext.options.additional.indexOf('-raw'));
      assert.equal(2, ptext.options.additional.indexOf('-f'));
    })
  });


  describe('pdftotext', function(){
    it('should get pdf text', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');

      ptext.success(function(ret) {
        assert.ok(ret.length);
        done();
      });

      ptext.error(function(error) {
      });

      ptext.get();
    });
  });

  describe('error', function(done){
    it('should call error callback', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');

      ptext.success(function() {
      });

      ptext.error(function(error) {
        done();
      });

      ptext.get();
    })
  });

})
