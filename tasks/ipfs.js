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
      ,done = this.async();
    
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
      if(options.paths.length === 0) return done(true)
        

      var path = options.paths.shift()
        ,cmd = (options.bin+' add '+path+' '+flagStr).trim()
      
      grunt.log.writeln(cmd)
      
      var childProcess = cp.exec(cmd)
      
      childProcess.on('exit', function(code) {
        if (code === 1) {
          grunt.log.error('Fail');
          return done(false);
        }else{
          grunt.log.success('Added');
        }

        addFirstPathOrDone();
      });

    }
  })
};
