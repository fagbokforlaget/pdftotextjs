var assert = require('assert'),
    fs = require('fs'),
    pdftotext = require('../index.js');

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
      var ret = ptext.getTextSync();
      assert.ok(ret.length);
    });
  });

  describe('sync_error', function(){
    it('should throw exception', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');
      function fn() {
        var ret = ptext.getTextSync();
      }
      assert.throws(fn, /pdftotext error/);
    });
  });

  describe('file_with_spaces_info', function(){
    it('should get pdf text', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample 1.pdf');
      
      ptext.getText(function(err, ret, opts) {
        assert.equal(err, null);
        assert.ok(ret.length);
        assert.equal(opts.length, 2);
        done();
      });

    });
  });

  describe('pdftotext', function(){
    it('should get pdf text', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');
      
      ptext.getText(function(err, ret, opts) {
        assert.equal(err, null);
        assert.ok(ret.length);
        assert.equal(opts.length, 2);
        done();
      });

    });
  });

  describe('pdftotext', function(){
    it('should get pdf text per page', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');

      ptext.add_options(['-f 1', '-l 1']);

      ptext.getText(function(err, ret, opts) {
        assert.equal(err, null);
        assert.ok(ret.length);
        assert.equal(opts.length, 6);
        done();
      });

    });
  });

  describe('error', function(done){
    it('should call error callback', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');

      ptext.getText(function(err, data, opts) {
        if (err) {
          done();
        }
      });
    })
  });

})
