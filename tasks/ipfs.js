/*
 * grunt-ipfs
 * https://github.com/SafeMarket/grunt-ipfs
 *
 * Copyright (c) 2015 Aakil Fernandes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var cp = require('child_process')

  grunt.registerMultiTask('ipfsadd', 'Add file/folder to ipfs', function() {

    var options = this.options()
      ,done = this.async()
      ,hashes = {}
    
    options.bin = options.bin || 'ipfs'

    if(!options.paths || options.paths.length === 0){
      grunt.log.warn('options.paths not set or empty');
      done(false)
    }

    options.flags = options.flags || []

    var flagStr = options.flags.map(function(flag){
      return '-'+flag
    }).join(' ')

    addFirstPathOrDone()

    function addFirstPathOrDone(){
      if(options.paths.length === 0)
        if(options.save)
          fs.writeFile(options.save, JSON.stringify(hashes), function(err) {
              if(err) {
                  grunt.log.error('Could not save to '+options.save)
                  return done(false);
              }

              grunt.log.success('Saved to '+options.save);
              done()
          });
        else
          return done()
        

      var path = options.paths.shift()
        ,cmd = (options.bin+' add '+path+' '+flagStr).trim()
        ,hash = null
      
      grunt.log.writeln(cmd)
      
      var childProcess = cp.exec(cmd)
      
      childProcess.on('exit', function(code) {
        if (code === 1) {
          grunt.log.error('Fail');
          return done(false);
        }else{
          hashes[path] = hash
          grunt.log.success('Added '+hash);
        }

        addFirstPathOrDone();
      });

    }
  })
};
