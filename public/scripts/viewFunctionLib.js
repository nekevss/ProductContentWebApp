function pagecontent(SkuObjects) {
    if (isCurrent === false && historyobjects[x] !== null) {
	    obj = historyobjects[x];
    }
    else {
	    obj = SkuObjects[x]; //probably don't need to pass object to other functions if var declared	
    }

    console.log(`The object for index ${x} is: `);
    console.log(obj);
    document.getElementById("SkuName").innerHTML = obj['Sku Name'];
    document.getElementById("PPH").innerHTML = obj['Primary Path'];
    document.getElementById("headliner").innerHTML = obj['Headliner'];
    document.getElementById("shortdescription").innerHTML = obj['Short Description'];
    document.getElementById("extendeddescription").innerHTML = obj['Extended Description'];

    /*Note: Added both declaration to each option below due to interaction occuring in the selection menu jumping between the last and first sku*/
    try {
        navigationhandler(SkuObjects)
    }
    catch (error) {
        console.log(`There was an issue with the navigation button handler:`)
        console.error(`${error}`);
    }
    try {
        skunamehandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the SKU name handler:`)
        console.error(`${error}`);
    }
    try {
        numbershandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the numbers handler:`)
        console.error(`${error}`);
    }
    try {
        extrainfohandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the extra info handler:`)
        console.error(`${error}`);
    }
    try {
        bullethandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the bullet handler:`)
        console.error(`${error}`);
    }
    try {
        imagehandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the image handler:`)
        console.error(`${error}`);
    }
    try {
        spechandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the specifications handler:`)
        console.error(`${error}`);
    }
    try {
        styleguidehandler(obj);
    }
    catch (error) {
        console.log(`There was an issue with the Style Guide Handler:`)
        console.error(`${error}`);
    }
    try {
        document.getElementById("GenName").innerHTML = generateName(obj, true);
    }
    catch(error) {
        console.log("There was an issue with the SKU Name Generator: ")
        console.log(`${error}`)
    }
};

function navigationhandler(obj) {
    let navobject;
    if (isCurrent === false) {
	    navobject = historyobjects;
    }
    else {
	    navobject = SkuObjects;
    }
    if (navobject.length === 1) {
        document.getElementById("Back").style.visibility = "hidden";
	    document.getElementById("Next").style.visibility = "hidden";
    }
    else if (x <= 0) {
        document.getElementById("Back").style.visibility = "hidden";
	    document.getElementById("Next").style.visibility = "visible";
    }
    else if (x >= navobject.length - 1) {
        document.getElementById("Next").style.visibility = "hidden";
        document.getElementById("Back").style.visibility = "visible";
    }
    else {
        document.getElementById("Next").style.visibility = "visible";
        document.getElementById("Back").style.visibility = "visible";
    }

}

function skunamehandler(obj) {
    let str = `<table><tr><td>Vendor Model Number: ${obj['Vendor Model Number_NAD']}</td><td>UOM: ${obj['Selling UOM']}</td></tr></table>`;
    document.getElementById("SkuChart").innerHTML = str;
}

function numbershandler(obj) {
    let str = `<table><tr><td>Sku Number: ${obj['SKU Number']}</td><td>Wholesaler Item Number: ${obj['Wholesaler Item No']}</td></tr></table>`;
    document.getElementById("SkuNumbersChart").innerHTML = str;
}

function styleguidehandler(obj) {
    let styleguidekey;
    let pathSG;
    const pathArray = obj['Primary Path'].split("/")
    //console.log(pathArray)
    for (let i = pathArray.length- 1; i !== 0 ; i--) {
        if (pathArray[i].search('Items') > -1) {
            //console.log(pathArray[i - 1])
            pathSG = pathArray[i-1]
        }
    }

    //console.log(`Logging class: ${obj.Class} || Logging path value: ${pathSG}`)
    pathSG = pathSG.replace('&comma;', ',')

    if (obj.Class !== pathSG || obj.Class == 'Primary Products') {
        styleguidekey = pathSG
        document.getElementById("SGClass").innerHTML = `Tab: ${obj.Class} || Class: ${pathSG}`;
    }
    else {
        styleguidekey = obj.Class
        document.getElementById("SGClass").innerHTML = `Class: ${obj.Class}`;
    }


    //console.log(styleguidekey);
    for (i = 0; i <= SGArray.length-1; i++) {
	    let SGobj = SGArray[i];
	    if (SGobj.hasOwnProperty(styleguidekey)) {
	        //console.log(SGobj[styleguidekey]);
	        document.getElementById("StyleGuide").innerHTML = SGobj[styleguidekey];
	        break;
	    }
	    if (i == SGArray.length-1) {
	        document.getElementById("StyleGuide").innerHTML = "There is no Style Guide for the class or the call for this class is currently broken.";
	        break;
	    }
    }
}

function extrainfohandler(obj) {
    let str = `<table><tr><td>Prohibited and Conditional Words: </td><td>${obj['Prohibited/Conditional Word']}</td></tr>`;
    str += `<tr><td>Content Change Notes: </td><td>${obj['Content Change Notes']}</td></tr>`;
    str += `<tr><td>WE1 Match: </td><td> ${obj['WE1 Match']}</td></tr>`;
    str += `<tr><td>Vendor Name: </td><td>${obj['Vendor Name NAD']}</td></tr>`;
    str += `<tr><td>Brand Name: </td><td>${obj['Brand Name']}</td></tr>`;
    str += `<tr><td>Intent to Sell in SA: </td><td>${obj['Intent to Sell in SA']}</td></tr>`;
    str += `<tr><td>UNSPSC Code: </td><td>${obj['UNSPSC Code']}</td></tr>`;
    str += `<tr><td>Keywords 1: </td><td>${obj['Keywords 1']}</td></tr></table>`;
    document.getElementById("ExtraInfo").innerHTML = str;
}

function bullethandler(obj) {
    let str = "<ul>";
    for (i = 1; i <= 30; i++) {
        keystring = "Bullet_Copy_" + i;
        //console.log(obj[keystring])
        if (obj[keystring] !== null) {
            str += "<li>" + obj[keystring] + "</li>"
        };
    };
    str += "</ul>";
    //console.log(str)
    document.getElementById('bullets').innerHTML = str;
}

function imagehandler(obj) {
    //TODO: add div prior to current image for zoom bug fix
    let sourcestring = "http://www.staples-3p.com/s7/is/image/Staples/" + obj["Primary Image"];
    document.getElementById("CentralImage").innerHTML = `<img id="currentimage" src="${sourcestring}">`;   
    let gridstring = "<img class='gridimage' src='" + sourcestring + "' onclick='changeimage(this)'>";

    let count = 1;
    for (let i = 1; i < 8; i++) {
        keystring = "Secondary Image " + i;
        if (obj[keystring] !== null) {
            sourcestring = "http://www.staples-3p.com/s7/is/image/Staples/" + obj[keystring]
            //console.log(sourcestring)
            gridstring += "<img class='gridimage' src='" + sourcestring + "' onclick='changeimage(this)'>";
            count++
        }
    }
    
    document.getElementById("ImageGrid").innerHTML = gridstring;
    let img = document.getElementById("currentimage")
    img.addEventListener("mouseover", function() {
        document.getElementById("ImageZoom").style.visibility = "visible";
        imageZoom("currentimage", "ImageZoom");
    }, false);

    //TODO: Fix this godawful thing. 99% needs to go inside mouseover event listener.
    /*img.addEventListener("mouseleave", function() {
        document.getElementById("ImageZoom").style.visibility = "hidden";
        let lens = document.getElementById("zoomLens");
        img.parentElement.removeChild(lens);
    }, false)*/
    

}

function spechandler(obj) {
    const SpecObj = obj.Specs;
    //console.log(SpecObj);
    let str = '<table class="Specifications">';
    let row = 0;
    for (let spec in SpecObj) {
	    row ++;
	    if (row % 2 !== 0) {
	        str += '<tr>';
	    }
	    str += `<td>${spec}</td><td>${SpecObj[spec]}</td>`;
	    if (row % 2 == 0) {
	        str += '</tr>';
	    }
    }
    str += '</table>';
    document.getElementById("SpecTable").innerHTML = str;
}

function nextindex() {
    x++;
    pagecontent();
}

function lastindex() {
    x--;
    pagecontent();
}

function changeimage(clickedimage) {
    console.log(clickedimage.src);
    document.getElementById("currentimage").src = clickedimage.src;
}

function CreateMenuBlocks() {
    let activeobjectsarray = {};
    
    if (isCurrent === false) {
	    activeobjectsarray = historyobjects;
    } 
    else {
	    activeobjectsarray = SkuObjects;
    }

    //console.log(activeobjectsarray);

    let str = '';
    for (i=0; i<= activeobjectsarray.length-1; i++) {
	    let NodeObj = activeobjectsarray[i];
	//console.log(NodeObj);
	    str += `<div class="MenuNode" onclick="menuselection(${i})"><div class="NodeImg"><img src=http://www.staples-3p.com/s7/is/image/Staples/${NodeObj["Primary Image"]} ></img></div>`
	    str += `<div class="NodeInfo"><div id ="NodeClass">Class: ${NodeObj.Class} </div>`
	    str += `<div id ="NodeName">Sku Name: ${NodeObj['Sku Name']} </div></div>`
	    str += '</div>'
    }
    document.getElementById("MenuBlocks").innerHTML = str;
    document.getElementById("MenuMessage").innerHTML = `<p>Currently at ${x+1} of ${activeobjectsarray.length}</p>`
}


function openmenu() {
    CreateMenuBlocks();
    document.getElementById("Menu").style.display = "block";
}

function closemenu() {
    document.getElementById("Menu").style.display = "none";
}

function menuselection(index) {
    x=index;
    pagecontent();
}




function removefromhistory(key) {
    localStorage.removeItem(key);
    findspace(false);
    createhistorynodes();
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