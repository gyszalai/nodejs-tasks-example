/** 
 * Code based on Node.js in Action by Mike Cantelon, TJ Holowaychuk and Nathan Rajlich
 * Chapter 3.4 - Sequencing Asynchronous Logic 
 */

var taskList = [
    function() {
        console.log("func1");
        doNextTask(false, "alpha");
    },
    function(result1) {
        console.log("func2, result1: " + result1);
        doNextTask(false, "beta");
    },
    function(result2) {
        console.log("func3, result2: " + result2);
        doNextTask ("Some serious problem");
    },
    function(result3) {
        console.log("func4, result3: " + result3);
        doNextTask (false, "delta");
    }
];

function doNextTask(error, result) {
    if (error) {
        console.log("An error occured: " + error);
    } else {
        var currTask = taskList.shift();
        if (currTask) {
            currTask(result);
        }
    }
}

doNextTask();

