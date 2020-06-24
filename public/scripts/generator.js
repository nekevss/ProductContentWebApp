var generatorReport = {};
var lastGenerator = {class: 'none'};
var symbolRef = {
    "Inches" : '"',
    "ft." : "'"
}

var regRef = {
    "Staples" : 'Staples&reg;',
    "TRU RED" : "TRU RED&reg;"
}

function generateName(obj, display) {
    let gen;
    let base = {total: 0}
    let genreport;
    //The below lastGenerator check hopefully optimizes run time inside classes.
    //It prevents iterating through potentially thousands of classes, multiple
    //times.
    if (lastGenerator.class == obj.Class) {
        gen = setgen(lastGenerator, obj);
        genreport = generatorReport[lastGenerator.class];
        genreport.total += 1;
    }
    else {
        for (i = 0; i< Generators.length; i++) {
            if (Generators[i].class == obj.Class) {
                console.log("Here's the Generator Object!");
                console.log(Generators[i])
                lastGenerator = Generators[i];
                gen = setgen(Generators[i], obj);
                genreport = base;
                genreport.total = 1
                break;
            }
        }
    }
    //handler for if a class is not currently in the style guide
    if (!genreport) {
        let errorGen = {"class" : "Error: Class Not Present", gen: undefined};
        lastGenerator = errorGen;
        genreport = base;
        genreport.total = 1
    }
    //handle undefined generators
    if (!gen) {
        console.log("Did not find viable generator");
        //console.log(genreport);
        //console.log(lastGenerator.class)
        //Teranary operator didn't work? Keeping in case
        genreport["errors"] = genreport["errors"] ?  genreport["errors"] + 1 : 1;
        generatorReport[lastGenerator.class] = genreport;
        return "Null Generator Error: Cannot generate recommended name for this class"
    }
    else {
        //checks for if display variable is true (turned off for the bulk viewer to prevent jamming console)
        if (display) {
            console.log("Beep boop, logging the generator I found");
            console.log(gen);
        }
    }


    //console.log("Logging generator...")
    //console.log(gen)
    let name = "";
    let count = 1;
    for (call in gen) {
        /* Build for function implementation...this should work. Need to test
        if (call == "fun" + count) {
            f = "fun" + call
            name += gen[f](obj)
        }
        */
        
        if (call == "spec" + count) {
            let generatorcall = gen[call]
            if (!genreport.hasOwnProperty(generatorcall)) {genreport[generatorcall] = {attempts: 0, conn: 0}}
            if (generatorcall === 'Brand') {
                if (obj['Brand Name'] || obj['Brand Name']) {genreport[generatorcall].conn += 1}
                genreport[generatorcall].attempts += 1;
                name += obj['Brand Name'];
            }
            else if (generatorcall == 'Manufacturer Model #' || generatorcall =='Manufacturer Model#') {
                if (obj['Vendor Model Number_NAD'] || obj['Vendor Model Number_NAD']) {genreport[generatorcall].conn += 1}
                genreport[generatorcall].attempts += 1;
                name += obj['Vendor Model Number_NAD'];
            }
            else {
                try {
                    let specval = obj.Specs[generatorcall];
                    if (specval && specval !== '') {genreport[generatorcall].conn += 1}
                    genreport[generatorcall].attempts += 1;
                    //console.log(`${generatorcall} returns the spec value ${specval}`)
                    //console.log(specval)
                    const regex = /\s\&lpar\;(\d*|\w*|\s)\&rpar\;/g;
                    specval = (specval === null | specval === undefined) ? "": specval;
                    specval.toString();
                    if (regex.test(specval)) {
                        //console.log(specval.replace(regex, ""))
                        let re = specval.replace(regex, "");
                        name += re;
                    }
                    else {
                        name += specval;
                    }
                    
                }
                catch (err) {
                    genreport[generatorcall] = -1;
                    console.log(`Beep, Boop. There was an error calling spec: ${err}`);
                }
            }
            
        }
        else {
            name += gen[call];
        }
        count++
    }

    //Below is the Regex and common find/replaces to deal with double spaces and orphaned commas
    
    const reg = /\,\s*\(/g
    while (reg.test(name)) {
        name = name.replace(reg, " (")
    }

    //const reg2 = /\s\*NOTE\:(\w*|\s*)/g
    //if (reg2.test(name)) {
        //name = name.replace(reg2, "")
    //}

    name = name.replace(" *NOTE: If the Color and Material values are the exact same, remove the Material value from the SKU Name", "")
    name = name.replace(" , ", ", ")
    const reg2 = /\,\s\s\s*/g;
    while (reg2.test(name)) {
        name = name.replace(reg2, ", ");
    }

    //log report Value

    generatorReport[lastGenerator.class] = genreport;
    //console.log(`Assigning report ${generatorReport[lastGenerator.class]}`)

    return name;
}

function setgen(gen, obj) {
    if (gen.type == 'subclassed') {
        //console.log("Running return generator function")
        //console.log(Generators[i])
        return gen.subclass.returnGenerator(obj);
    }
    else {
        return gen.generator;
    }
}

function cleanSpec(spec) {
    const regex = /\s\&lpar\;\d*\&rpar\;/g;
    if (regex.test(spec)) {
        spec = spec.replace(regex, "");
    }
    return spec
}