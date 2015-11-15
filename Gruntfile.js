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
          ,output:'ipfstest/reamde'
        }
      },
    },
    ipfsadd: {
      ipfstest: {
        options: {
          files:['ipfstest/reamde']
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
    clean: {
      ipfstest: 'ipfstest/'
    },

  });

  grunt.loadTasks('tasks');
  grunt.registerTask('test', ['grunt ipfs test'], ['ipfscheck:ipfstest','mkdir:ipfstest','ipfsget:ipfstest','ipfsadd:ipfstest','clean:ipfstest'])
};
