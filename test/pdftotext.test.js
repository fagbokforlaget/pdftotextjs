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

  describe('sync_text', function(){
    it('should get pdf text via sync call', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');
      var ret = ptext.getSync();
      assert.ok(ret.length);
    });
  });

  describe('sync_error', function(){
    it('should throw exception', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');
      function fn() {
        var ret = ptext.getSync();
      }
      assert.throws(fn, /pdftotext error/);
    });
  });

  describe('file_with_spaces_info', function(){
    it('should get pdf text', function(done){
      var pinfo = new pdftotext(__dirname + '/pdfs/sample 1.pdf');

      pinfo.success(function(ret) {
        assert.ok(ret.length);
        done();
      });

      pinfo.error(function(error) {
      });

      pinfo.get();
    });
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
