(function(global) {
"use strict";

// --- dependency modules ----------------------------------
var Task = global["Task"] || require("uupaa.task.js"); // https://github.com/uupaa/Task.js/wiki/Task
var Proxy = global["Proxy"] || require("uupaa.proxy.js"); // https://github.com/uupaa/Proxy.js/wiki/Proxy

// --- define / local variables ----------------------------
//var _runOnNode = "process" in global;
//var _runOnWorker = "WorkerLocation" in global;
//var _runOnBrowser = "document" in global;

// --- class / interfaces ----------------------------------
var AppCacheProxy = {};

//{@dev
AppCacheProxy["repository"] = "https://github.com/legokichi/AppCacheProxy.js"; // GitHub repository URL. http://git.io/Help
//}@dev

AppCacheProxy["createProxyURLs"] = AppCacheProxy_createProxyURLs; // AppCacheProxy.createProxyURLs(doubles:[[url:String, mimeType:String]], callback:Function):void
AppCacheProxy["createProxyURL"]  = AppCacheProxy_createProxyURL;  // AppCacheProxy.createProxyURL(url:String, mimeType:String, callback:Function):void

// --- implements ------------------------------------------
function AppCacheProxy_createProxyURLs(hashes,     // @arg HashArray - [{url:String, mimeType:String}]
                                       callback) { // @arg Function - callback(err:Error|null, url:BlobURLString):void
                                                   // @ret void
//{@dev
    $args(AppCacheProxy_createProxyURLs, arguments);
//}@dev
    var task = new Task(hashes.length, function(err, blobUrls){
        callback(err, blobUrls);
    });
    hashes.forEach(function(hash, i){
        var url = hash.url, mimeType = hash.mimeType;
        AppCacheProxy_createProxyURL(url, mimeType, function(err, blobUrl){
            task["set"](i, blobUrl);
            task["done"](err);
        });
    });
}

function AppCacheProxy_createProxyURL(url,        // @arg URLString
                                      mimeType,   // @arg mimeTypeString
                                      callback) { // @arg Function - callback(err:Error|null, url:BlobURLString):void
                                                  // @ret void
//{@dev
    $args(AppCacheProxy_createProxyURL, arguments);
//}@dev
    _getArrayBuffer(url, function(err, buffer){
        var blobURL = URL.createObjectURL(new Blob([buffer], {type: mimeType}));
        callback(err, blobURL);
    });
}

function _getArrayBuffer(url,        // @arg URLString
                         callback) { // @arg Function - callback(err:Error|null, buffer:ArrayBuffer):void
                                     // @ret void
//{@dev
    $args(_getArrayBuffer, arguments);
//}@dev
    var xhr = new Proxy();
    xhr["on"]("load", function() {
        if (200 <= xhr["status"] && xhr["status"] < 300) {
            //{@dev
            console.info(xhr["response"]);
            //}@dev
            if(typeof xhr["response"]["error"] === "undefined"){
              callback(null, xhr["response"]);
            }else{
              callback(new Error(xhr.response.error.message), "");
            }
        } else {
            callback(new Error(xhr.status), "");
        }
    });
    xhr["open"]("GET", url);
    xhr["responseType"] = "arraybuffer";
    xhr["send"]();
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if ("process" in global) {
    module["exports"] = AppCacheProxy;
}
global["AppCacheProxy" in global ? "AppCacheProxy_" : "AppCacheProxy"] = AppCacheProxy; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule
