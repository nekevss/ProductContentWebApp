var ReportQueue = [];

document.addEventListener('DOMContentLoaded', function() {
    addGenTable();
    addObjdata()
    processGeneratorReport()
}, false);

function addGenTable() {
    let RecNameTable = "<table>"
    let obj;

    console.log("Loading all recommended names...")
    for (x = 0; x < SkuObjects.length; x++) {
        obj = SkuObjects[x];
        recname = generateName(obj, false);
        RecNameTable += '<tr><td>' + recname+ '</td></tr>';
    }


    RecNameTable += '</table>';
    document.getElementById("RecTable").innerHTML = RecNameTable;
}

function addObjdata() {
    let dataTable = '<table>';
    let obj;

    for (x = 0; x < SkuObjects.length; x++) {
        obj = SkuObjects[x];
        dataTable += '<tr><td>' + obj.Class +'</td>'
        dataTable += '<td>' + obj['SKU Number'] + '</td></tr>';
    }
    document.getElementById("SkuTable").innerHTML = dataTable;
}

//Below is Chris Gentry's idea.
//Stack Overflow: https://stackoverflow.com/questions/2044616/select-a-complete-table-with-javascript-to-be-copied-to-clipboard

function CopyAllNames() {
    el = document.getElementById("RecTable")
    var body = document.body, range, sel;
    if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
            range.selectNodeContents(el)
            //console.log("Running 1")
            sel.addRange(range);
        } catch (e) {
            console.log("Running 2")
            //range.selectNode(el);
            sel.addRange(range);
        }
        document.execCommand("copy");

    } else if (body.createTextRange) {
        //console.log("Running 3")
        range = body.createTextRange();
        range.moveToElementText(el);
        range.select();
        range.execCommand("copy");
    }
}

function processGeneratorReport() {
    const precise = (n) => Number.parseFloat(n).toPrecision(4)
    let out;
    let total;
    let gen;
    let val;
    
    for (report in generatorReport) {
        
        out = {}
        out['tab'] = report;
        gen = generatorReport[report];
        out['errors'] = gen.errors;
        total = gen.total;

        for (spec in gen) {
            if (spec === 'total' || spec === 'errors') {continue;}
            out[spec] = {};
            val = (gen[spec].attempts / total) * 100;
            out[spec].percTotal = (val % 1) === 0 ? val : precise(val);
            val = (gen[spec].conn / gen[spec].attempts) * 100;
            out[spec].utility = (val % 1) === 0 ? val : precise(val);
        }
        
        ReportQueue.push(out)
    }
}

function logReport() {
    console.log("Logging the SKU Name Spec Report");
    console.log(ReportQueue);
    
    const view = document.getElementById("report-view");
    view.style.display = "block";
    CreateReportDisplay();
}

function CreateReportDisplay() {
    const view = document.getElementById("report-view");
    const display = document.createElement('div')
    display.className = 'report-display';
    display.addEventListener("click", function() {
        event.stopPropagation();
    }, false);
    view.appendChild(display);

    const displayNav = document.createElement("div");
    displayNav.className = 'report-nav';
    displayNav.id = 'overlay-nav'
    display.appendChild(displayNav);

    let tabheader = document.createElement('div');
    tabheader.className = 'tab-header';
    tabheader.innerHTML = " Available Classes";
    displayNav.appendChild(tabheader)

    for (let i=0; i < ReportQueue.length; i++) {
        let tab = document.createElement('div');
        tab.className = "report-tab";
        tab.innerHTML = ReportQueue[i].tab;
        //console.log(ReportQueue[i]);
        tab.addEventListener("click", function() {
            displayReport(i);
        }, false);
        displayNav.appendChild(tab);
    }

    const displaytable = document.createElement("div");
    displaytable.className = "report-container";
    displaytable.id = "report-table";
    display.appendChild(displaytable);

    displayReport(0);

}

function displayReport(index) {
    event.stopPropagation();

    let nav = document.getElementById("overlay-nav");
    let children = nav.childNodes;
    for (let i = 1; i<children.length; i++) {
        let tab = nav.childNodes[i]
        if (i === index+1) {
            tab.className = "current-tab"
            continue;
        }
        tab.className = "report-tab"
    }

    let reportObj = ReportQueue[index]

    let table = "<table>";
    table += `<tr><th>Category</th><th>Percentage of Total</th><th>Percentage of Successful Calls</th></tr>`
    for (spec in reportObj) {
        if (spec === 'tab' || spec === 'errors') {continue;}
        table += `<tr><td>${spec}</td><td>${reportObj[spec].percTotal}%</td><td>${reportObj[spec].utility}%</td></tr>`
    }
    table += `</table>`;
    if (reportObj['errors']) {table = `<h2>There was ${reportObj.errors} fatal error(s) for this generator</h2>` + table;}
    document.getElementById("report-table").innerHTML = table;
    //console.log(Object.keys(reportObj).length)
    if (Object.keys(reportObj).length === 1) {
        document.getElementById("report-table").innerHTML = "<h2>There was an error creating a report for this generator</h2>"
    }
}

function closeReportView() {
    const el = document.getElementById("report-view");
    el.style.display = "none";
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}