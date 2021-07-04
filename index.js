const main = (argv) => {
    const
        argMap = new Map(),
        freeArguments = [],
        // Regex Stuff
        eqSymbol = /(--.*)=(.*)/, //RegExp Matchs --value=value
        eqSymbolTest = x => eqSymbol.test(x),
        eqSymbolExe = x => eqSymbol.exec(x),
        resultKey = x => eqSymbolExe(x)[1], // when grouping --(this-value)=... is at index 1
        resultValue = x => eqSymbolExe(x)[2], // and --...=(this-value) is at index 2
        //End Regex stuff
        nextOf = (arr) => (x) => arr.indexOf(x) + 1,
        nO = nextOf(argv), // Partial aplication of nextOne for argv array
        matchHyphen = x => typeof x === "string" && x.slice(0,1) === "-",
        matchDoubleHyphen = x =>  typeof x === "string" && x.slice(0,2) === "--",
        //90% on the program itself is below
        filterFunc = (x) =>
            typeof x !== "string"
                ? undefined
                : eqSymbolTest(x)
                // Check Presence of --key=value type
                    ? argMap.set(resultKey(x), resultValue(x))
                    : matchHyphen(x) && matchHyphen(argv[nO(x)])
                    // Check if --value --value cond is true
                        ? argMap.set(x, true)
                        : matchHyphen(x) && !(matchDoubleHyphen(x)) && x.length > 2
                            ? x.split("").slice(1).forEach(xs => argMap.set(xs, true))
                            : matchHyphen(x) || matchDoubleHyphen(x)
                                ? argMap.set(x, argv[nO(x)])
                                : freeArguments.push(x);
    argv.forEach(filterFunc); // For each element run the filter function
    argMap.set("_", freeArguments); // Every element that don't fall into previous cat. goes to this array, and then is bind to "_"
    return argMap;
};
module.exports = main;
