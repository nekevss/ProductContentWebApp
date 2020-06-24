var x;
if (sessionStorage.getItem('lastPage') === 'CardView') {
    x = parseInt(sessionStorage.getItem('objectIndex'))
}
else {
    x = 0;
}
sessionStorage.setItem('lastPage', 'mainPage')

var keystring;
var obj;
var isCurrent = true;
var historyobject;
var storagememory;

document.addEventListener('DOMContentLoaded', function() {
    const padDate = (n) => n < 0 ? 24 + n : n < 10 ? '0' + n : n;
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() / 60;
    const histname = today.getFullYear() + "-" + padDate(today.getUTCMonth() + 1) + "-" + padDate(today.getUTCDate()) + " " + padDate(today.getUTCHours() - timezoneOffset) + ":" + padDate(today.getUTCMinutes()) + ":" + padDate(today.getUTCSeconds());
    const ObjectCheck = (obj1, obj2) => obj1 === obj2;
    const DateCheck = (date1, date2) => new Date(date2) > new Date(date1);

    const storagekeys = Object.keys(localStorage);
    const histobj  = SkuObjects;

    let lastkey = '0';
    for (i = 0; i<storagekeys.length; i ++) {
	    let datevalue = storagekeys[i];
	    if (DateCheck(lastkey, datevalue)) { 
	        lastkey = datevalue;
	    }  
    }
    const histcheck = ObjectCheck(JSON.stringify(histobj), localStorage.getItem(lastkey));

    if (histcheck === false) {
        try {
            localStorage.setItem(histname, JSON.stringify(histobj));
        }
        catch (error) {
            console.log(`There was an error loading data to storage:`);
            console.error(`${error}`);
        }
    }

    findspace(false);
    pagecontent();


}, false);