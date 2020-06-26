fetch("http://localhost:5500/api/")
    .then(response => response.json())
    .then(res => {
            let data = JSON.parse(JSON.stringify(res));
            console.log(data)
            pagecontent(data);
    })
    .catch(err => console.log(`There was an error fetching data: ${err}`))


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
