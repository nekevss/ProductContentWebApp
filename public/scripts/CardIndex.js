//console.log("Hello is this thing on?")
document.addEventListener('DOMContentLoaded', function() {
    console.log("Loading Cards...");
    try {
        createCards();
        console.log("Load is Complete!")
    }
    catch(err) {
        console.log("Card Creation is Broken.")
    }
}, false);

function createCards() {
    let str = '';
    for (let i = 0; i < SkuObjects.length; i++) {
        let obj = SkuObjects[i];
        str += `<div class="Card" onclick="nodeClick(${i})">`;
        str += `<div id="Image" class="NodeData"><img src="${obj['Primary Image URL']}"></img></div>`;
        str += `<div id="SkuName" class="NodeData">${obj['Sku Name']}</div>`;
        str += `<div id="UOM" class="NodeData">UOM: ${obj['Selling UOM']}</div>`;
        str += `<div id="Completeness" class="NodeData">Filter Attr. Score: ${obj['Completeness % (Filtered Attributes)']}</div>`;
        str += `</div>`;
    }

    document.getElementById('node-container').innerHTML = str
}

function nodeClick(nodeID) {
    console.log("Setting Session Storage")
    sessionStorage.setItem('lastPage', 'CardView');
    sessionStorage.setItem('objectIndex', nodeID)
    location.href='./MainPage.html'
}