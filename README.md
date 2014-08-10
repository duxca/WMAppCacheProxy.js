# WMAppCacheProxy.js [![Build Status](https://api.travis-ci.org/legokichi/WMAppCacheProxy.js.png)](http://travis-ci.org/legokichi/WMAppCacheProxy.js)

[![npm](https://nodei.co/npm/legokichi.wmappcacheproxy.js.png?downloads=true&stars=true)](https://nodei.co/npm/legokichi.wmappcacheproxy.js/)

use Application cache resources inside Iframe.

## Document

- [WMAppCacheProxy.js wiki](https://github.com/legokichi/AppCacheProxy.js/wiki/WMAppCacheProxy)
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))


## How to use

### Browser

```js
<script src="lib/WMAppCacheProxy.js"></script>
<script>
WMAppCacheProxy.createProxyURL(url, mimeType, function(err, blobURL){
    console.log(blobURL);
});
</script>
```

### WebWorkers

```js
importScripts("lib/WMAppCacheProxy.js");

WMAppCacheProxy.createProxyURL(url, mimeType, function(err, blobURL){
    console.log(blobURL);
});
```
