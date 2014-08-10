var ModuleTestAppCacheProxy = (function(global) {

var Proxy = global["Proxy"] || require("uupaa.proxy.js");

var _runOnNode = "process" in global;
var _runOnWorker = "WorkerLocation" in global;
var _runOnBrowser = "document" in global;
var AppCacheProxy = WMAppCacheProxy;
return new Test("AppCacheProxy", {
        disable:    false,
        browser:    true,
        worker:     false,
        node:       false,
        button:     true,
        both:       true, // test the primary module and secondary module
    }).add([
        test_AppCacheProxy_createProxyURL,
        test_AppCacheProxy_createProxyURLs,
    ]).run().clone();

function test_AppCacheProxy_createProxyURL(test, pass, miss) {
    var url = location.href;
    var mimeType = "text/html";
    get(url, function(err, data){
        if (!!err) return test.done(miss(err));
        AppCacheProxy.createProxyURL(url, mimeType, function(err, blobUrl){
            if (!!err) return test.done(miss(err));
            get(blobUrl, function(err, _data){
                if (!!err) return test.done(miss(err));
                if ( data === _data ){
                    test.done(pass());
                }
            });
        });
    });
}

function test_AppCacheProxy_createProxyURLs(test, pass, miss) {
    var url = location.href;
    var mimeType = "text/html";
    get(url, function(err, data){
        if (!!err) return test.done(miss(err));
        AppCacheProxy.createProxyURLs([{url:url, mimeType:mimeType}], function(err, blobUrls){
            if (!!err) return test.done(miss(err));
            get(blobUrls[0], function(err, _data){
                if (!!err) return test.done(miss(err));
                if ( data === _data ){
                    test.done(pass());
                }
            });
        });
    });
}

function get(url, callback){
    var proxy = new XMLHttpRequest();
    proxy["addEventListener"]("load", function() {
        if ( this["status"] >= 200 && this["status"] < 300 ) {
            callback(null, this["responseText"], this);
        } else {
            callback(new Error(this["status"]), "", this);
        }
    });
    proxy["open"]("GET", url);
    proxy["send"]();
}


})((this || 0).self || global);
