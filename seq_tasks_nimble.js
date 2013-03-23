/** 
 * Code based on Node.js in Action by Mike Cantelon, TJ Holowaychuk and Nathan Rajlich
 * Chapter 3.4 - Sequencing Asynchronous Logic 
 */

var flow = require('nimble'),
    request = require('request'),
    fstream = require("fstream"),
    tar = require("tar"),
    zlib = require("zlib");

function downloadWebPageToTarGz(url, destination, callback) {
    request(url, function(error, response, body) {
        console.log('Downloading url: ' + url + '...');
        console.log("response.statusCode: " + response.statusCode);
        if (response.statusCode === 200) {
            console.log("response length: " + response.headers['content-length']);
            callback();
        } else {
            callback("Error: " + response.statusCode);
        }
    }).pipe(tar.Pack()).pipe(zlib.createGzip()).pipe(fstream.Writer(destination));
}

var downloadDir = '/tmp/node-download';

flow.series([
    function(callback) {
        downloadWebPageToTarGz("http://planetnetbeans.org", downloadDir + "/planetnetbeans.org.gz", callback);
    },
    function(callback) {
        downloadWebPageToTarGz("http://planet.ubuntu.com", downloadDir + "/planet.ubuntu.com.gz", callback);
    },
    function(callback) {
        fstream.Reader({path: downloadDir, type: "Directory"}).pipe(tar.Pack()).pipe(zlib.createGzip()).pipe(fstream.Writer("/tmp/node-download.tar.gz"));
        console.log('Ready');
        callback();
    }
], function(error) {
    console.log('Finished all tasks, error: ' + error);
});
