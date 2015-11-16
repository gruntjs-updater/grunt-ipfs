# grunt-ipfs

> Simple ipfs tasks for grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

*This package has not yet been published, so the following is incorrect*

```shell
npm install grunt-ipfs --save-dev 
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-ipfs');
```

## The "ipfscheck" task

Make sure the ipfs daemon is running

```js
grunt.initConfig({
  ipfscheck: {
    default:{
      options: {
        domain: 'localhost'   //optional
        ,host: 5001           //optional
      }
    }
  },
});
```

## The "ipfsadd" task

Add a file to ipfs

```js
grunt.initConfig({
  ipfsadd: {
    default:{
      options: {
        domain: 'localhost'       //optional
        ,host: 5001               //optional
        ,files:['myFile.txt']
        ,output:'hashes.json'     //optional
      }
    }
  },
});
```

## The "ipfsget" task

Get a file from ipfs and save it to your filesystem

```js
grunt.initConfig({
  ipfsget: {
    default:{
      options: {
        domain: 'localhost'     //optional
        ,host: 5001             //optional
        ,hash: 'QmeHAUST7aL9ZCyqo7JyUfPXQzPmhYV2WSmAUz7Mhk7kmG'
        ,output:'myFile.txt'    //optional, defaults to options.hash
      }
    }
  },
});
```
