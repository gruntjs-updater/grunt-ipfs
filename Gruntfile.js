/*
 * grunt-ipfs
 * https://github.com/SafeMarket/grunt-ipfs
 *
 * Copyright (c) 2015 Aakil Fernandes
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-cat');

  // Project configuration.
  grunt.initConfig({
    ipfscheck: {
      ipfstest: {
        options: {}
      },
    },

    ipfsget: {
      ipfstest: {
        options: {
          hash:'QmPXME1oRtoT627YKaDPDQ3PwA8tdP9rWuAAweLzqSwAWT/readme'
          ,output:'ipfstest/reamde.txt'
        }
      },
    },
    ipfsadd: {
      ipfstest: {
        options: {
          files:['ipfstest/reamde.txt']
          ,output:'ipfstest/ipfs.json'
        }
      },
    },
    mkdir: {
      ipfstest: {
        options: {
          create:['ipfstest/']
        }
      },
    },
    cat: {
      readme: {
        files: [
          {src:['ipfstest/readme.txt']}
        ]
      },json: {
        files: [
          {src:['ipfstest/ipfs.json'],expand:true}
        ]
      }
    },
    clean: {
      ipfstest: 'ipfstest/'
    },

  });

  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['grunt ipfs test'], ['mkdir:ipfstest','ipfsget:ipfstest','ipfsadd:ipfstest','cat','clean:ipfstest'])
};
