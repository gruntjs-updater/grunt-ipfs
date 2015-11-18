/*
 * grunt-ipfs
 * https://github.com/SafeMarket/grunt-ipfs
 *
 * Copyright (c) 2015 Aakil Fernandes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('ipfsadd', 'Add files/folders to ipfs', function() {

    var fs = require('fs')
      ,ipfsAPI = require('ipfs-api')
      ,options = this.options()
      ,done = this.async()
      ,hashes = {}

    if(!options.files || options.files.length === 0){
      grunt.log.warn('options.files not set or empty');
      return done(false)
    }

    options.host = options.host || 'localhost'
    options.port = options.port || 5001

    var ipfs = ipfsAPI(options.host,options.port)

    ipfs.add(options.files,function(err,res){
      if(err || !res) return done(false)

      res.forEach(function(file,index) {
        var fileName = options.files[index]
        grunt.log.success('Added '+fileName+' as '+file.Hash)
        hashes[fileName]=file.Hash
      })

      if(options.output)
        return fs.writeFile(options.output, JSON.stringify(hashes), function(err) {
            if(err) {
                grunt.log.error('Could not save to '+options.output)
                return done(false);
            }

            grunt.log.success('Saved to '+options.output);
            return done()
        });
      else
        return done()
    })

  })

  grunt.registerMultiTask('ipfsget', 'Get the contents of a hash and save it to a file', function() {

    var options = this.options()
      ,child = require('child_process')
      ,fs = require('fs')
      ,ipfsAPI = require('ipfs-api')
      ,fs = require('fs')
      ,done = this.async()

    if(!options.hash){
      grunt.log.warn('options.hash not set or empty');
      return done(false)
    }

    options.host = options.host || 'localhost'
    options.port = options.port || 5001
    options.output = options.output || options.hash

    var ipfs = ipfsAPI(options.host,options.port)

    ipfs.cat(options.hash, function(err, res) {
      if(err || !res){
        grunt.log.warn(err)
        return done(false)
      }

      if(res.readable) {
        // Returned as a stream
        var repl = child.spawn('node')
          ,file = fs.createWriteStream(options.output)

        repl.stdout.pipe(process.stdout, { end: false });
        repl.stdout.pipe(file);

        process.stdin.resume();

        res.pipe(repl.stdin, { end: true });
        res.pipe(file)

        res.on('data', function(chunk) {
          file.write(chunk)
        });

        res.on('end',function(){
          file.close()
        });

        file.on('close',function(){
          done()
        })

      }else {
        console.log(res)
        // Returned as a string
        fs.writeFile(output)
        done()
      }
    })
  })

  grunt.registerMultiTask('ipfscheck',function(){

    var options = this.options()
      ,ipfsAPI = require('ipfs-api')
      ,done = this.async()

    options.host = options.host || 'localhost'
    options.port = options.port || 5001

    var ipfs = ipfsAPI(options.host,options.port)

    ipfs.version(function(err,res){
      if(err || !res || !res.Version){
        grunt.log.warn(err)
        return done(false)
      }

      grunt.log.success('Running ipfs version '+res.Version)

      return done()
    })
  })

};
