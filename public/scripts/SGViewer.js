document.addEventListener('DOMContentLoaded', function() {
    let str = '<table>';
    for (let i = 0; i < SGArray.length ; i++) {
        let obj = SGArray[i];
        for (objkey in obj) {
            str += `<tr><td>${objkey}</td><td>${obj[objkey]}</td></tr>`;
        }
    }
    str += '</table>';

    document.getElementById('table').innerHTML = str;
    document.getElementById('update-header').innerHTML = `<h3>Last Updated: ${SGDate}</h3>` 
}, false)