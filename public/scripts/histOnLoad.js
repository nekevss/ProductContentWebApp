var obj;
var keystring;
var obj;
var isCurrent = true;
var historyobjects;
var x = 0;

document.addEventListener("DOMContentLoaded", function() {
    let histInstance = sessionStorage.getItem('hist-instance');
    console.log(histInstance);
    historyobjects = JSON.parse(localStorage.getItem(histInstance));
    isCurrent = false;

    console.log(historyobjects);
    document.getElementById("header").innerHTML = `Export History: ${histInstance}`
    pagecontent()
}, false)
