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
      var stdout = ptext.getTextSync();
      assert.ok(stdout.length);
    });
  });

  describe('sync_error', function(){
    it('should throw exception', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');
      function fn() {
        var stdout = ptext.getTextSync();
      }
      assert.throws(fn, /I\/O Error/);
    });
  });

  describe('file_with_spaces_info', function(){
    it('should get pdf text', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample 1.pdf');

      ptext.getText(function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.ok(stdout.length);
        done();
      });

    });
  });

  describe('pdftotext', function(){
    it('should get pdf text', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');

      ptext.getText(function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.ok(stdout.length);
        done();
      });

    });
  });

  describe('pdftotext', function(){
    it('should get pdf text per page', function(done){
      var ptext = new pdftotext(__dirname + '/pdfs/sample.pdf');

      ptext.add_options(['-f 1', '-l 1']);

      ptext.getText(function(err, stdout, stderr) {
        assert.equal(err, null);
        assert.ok(stdout.length);
        done();
      });

    });
  });

  describe('error', function(done){
    it('should call error callback', function(){
      var ptext = new pdftotext(__dirname + '/pdfs/invalidfile.pdf');

      ptext.getText(function(err, stdout, stderr) {
        if (err) {
          done();
        }
      });
    })
  });

})
