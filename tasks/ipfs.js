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
      ,ipfsd = require('ipfsd-ctl')
      ,options = this.options()
      ,done = this.async()
      ,hashes = {}

    if(!options.files || options.files.length === 0){
      grunt.log.warn('options.files not set or empty');
      return done(false)
    }

    ipfsd.disposableApi(function (err, ipfs) {
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


  })

  grunt.registerMultiTask('ipfsget', 'Get the contents of a hash and save it to a file', function() {

    var options = this.options()
      ,child = require('child_process')
      ,fs = require('fs')
      ,ipfsd = require('ipfsd-ctl')
      ,fs = require('fs')
      ,done = this.async()

    if(!options.hash){
      grunt.log.warn('options.hash not set or empty');
      return done(false)
    }

    options.output = options.output || options.hash

    ipfsd.disposableApi(function (err, ipfs) {
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
              grunt.log.success('Saved the contents of '+options.hash+' to '+options.output)
              done()
            })

          }else {
            console.log(res)
            // Returned as a string
            fs.writeFileSync(output)
            done()
          }
        })
      })
    })

};
