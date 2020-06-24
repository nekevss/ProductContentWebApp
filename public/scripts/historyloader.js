document.addEventListener("DOMContentLoaded", function() {
    historynodeGenerator()
}, false)

function removefromhistory(key) {
    localStorage.removeItem(key);
    findspace(false);
    historynodeGenerator();
}

function historynodeGenerator () {
    let str = '';
    const storagekeys = Object.keys(localStorage);

    //sort local storage keys here
    const sortedkeys = storagekeys.sort((a, b) => new Date(b) - new Date(a));

    for (i=0; i< sortedkeys.length; i++) {
	    let NodeObj = JSON.parse(localStorage.getItem(sortedkeys[i]));
	    let NodeClasses = Array.from(new Set(NodeObj.map((object) => object.Class)));
	    let NodeDate = new Date
	    //console.log(NodeClasses);
	    str += `<div class="MenuNode"><div class="history-data"><div class="histname"> Export Date and Time: ${sortedkeys[i]} </div>`
	    str += `<div class="histcount"> Sku Count: ${NodeObj.length}</div><div class="NodeClasses">`
        str += 'Classes in Export: '
        for (j = 0; j< NodeClasses.length; j++) {
	        str+= NodeClasses[j]
	        if (j!= NodeClasses.length - 1) {
		        str += ', '
	        }
        }
        str += `</div></div><div class="button-container"><button onclick="recallhistoryinstance('${sortedkeys[i]}')">Open</button><button onclick="removefromhistory('${sortedkeys[i]}')">Remove Item</button></div></div>`	    
    }
    document.getElementById("nodes").innerHTML = str;
    document.getElementById("memory-message").innerHTML = `Current Memory Usage: ${findspace(true)/1000}/10MB`
}

function findspace(bool) {
    const sigfig = (num) => Number.parseFloat(num).toPrecision(3)
    let histTotal=0, histLen, hist;
    for(hist in localStorage){ 
        if(!localStorage.hasOwnProperty(hist)){
            continue;
        } 
        histLen= ((localStorage[hist].length + hist.length)* 2);
        histTotal+=histLen; 
        //console.log(hist.substr(0,50)+" = "+ (histLen/1024).toFixed(2)+" KB")
    };
    let finalTotal = (histTotal / 1024).toFixed(2)
    if (bool === true) {
        return sigfig(finalTotal);
    }
    else {
        console.log(`Total Storage Memory used is: ${sigfig(finalTotal)/1000} MB`);
    }
}

function recallhistoryinstance(instance) {
    sessionStorage.setItem("hist-instance", instance);
    
    location.href = "./historyView.html";
}