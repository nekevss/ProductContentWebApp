document.addEventListener('DOMContentLoaded', function(){
    console.log('Loading Table Row Content...')
    for (let i=0; i<SkuObjects.length; i++) {
        let obj = SkuObjects[i]
        table = document.getElementById('image-table')
        let row = table.insertRow(i+1);

        //row.insetCell(0).innerHTML = `<a href="./MainPage.html">Load in Site View</a>`
        row.insertCell(0).innerHTML = obj['SKU Number']
        row.insertCell(1).innerHTML = obj['Sku Name']
        row.insertCell(2).innerHTML = `<img src="http://www.staples-3p.com/s7/is/image/Staples/${obj['Primary Image']}"><p>${obj['Primary Image']}</p>`
        for (let j = 1; j < 8; j++) {
            let imagestr = `Secondary Image ${j}`;
            if (obj[imagestr] !== null) {
                row.insertCell(j+2).innerHTML = `<img src="http://www.staples-3p.com/s7/is/image/Staples/${obj[imagestr]}"><p>${obj[imagestr]}</p>`
            }
            else {
                row.insertCell(j+2)
            }
        }
    }
    console.log('Load is Complete!')
}, false);


function loadinMain(index) {
    
}