# AppCacheProxy.js [![Build Status](https://api.travis-ci.org/legokichi/AppCacheProxy.js.png)](http://travis-ci.org/legokichi/AppCacheProxy.js)

[![npm](https://nodei.co/npm/legokichi.appcacheproxy.js.png?downloads=true&stars=true)](https://nodei.co/npm/legokichi.appcacheproxy.js/)

use Application cache resources inside Iframe.

## Document

- [AppCacheProxy.js wiki](https://github.com/legokichi/AppCacheProxy.js/wiki/AppCacheProxy)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/AppCacheProxy.js">
<script>
AppCacheProxy.createProxyURL(url, mimeType, function(err, blobURL){
    console.log(blobURL);
});
</script>
```

### WebWorkers

```js
importScripts("lib/AppCacheProxy.js");

AppCacheProxy.createProxyURL(url, mimeType, function(err, blobURL){
    console.log(blobURL);
});
```
