const clamap = (argv_) => {
    const
        argMap = new Map(),
        freeArguments = new Array(),
        argv = argv_.slice(2),
        // Regex Stuff
        eqSymbol = /^--(.*)=(.*)$/, //RegExp Matchs --value=value
        eqSymbolTest = x => eqSymbol.test(x), // Check Presence of --key=value type argument
        eqSymbolExe = x => eqSymbol.exec(x), // result ["match", "key", "value"]
        resultKey = x => eqSymbolExe(x)[1], // when grouping --(this-value)=... is at index 1
        resultValue = x => eqSymbolExe(x)[2], // and --...=(this-value) is at index 2
        //End Regex stuff (Everything will be ok)
        matchHyphen = x => typeof x === "string" && x.slice(0,1) === "-",
        matchDoubleHyphen = x =>  typeof x === "string" && x.slice(0,2) === "--",
        matchHyphen_notDoubleHyphen_moreOneArg = x => matchHyphen(x) && !(matchDoubleHyphen(x)) && x.length > 2, // in short, this: "-abc"
        argsMinusHyphen = x => x.split("").slice(1), // "-abc" => ["a", "b", "c"]
        removeHyphen = x => x.split("").slice(matchDoubleHyphen(x) ? 2 : 1).join(""),
        //90% on the program itself is below
        filterFunc = (x, index, arr) =>
            typeof x !== "string"
                ? undefined
                : eqSymbolTest(x)
                    ? argMap.set(resultKey(x), resultValue(x))
                    : matchHyphen(x) && matchHyphen(arr[index + 1])
                    // Check if --value --value cond is true
                        ? argMap.set(removeHyphen(x), true)
                        : matchHyphen_notDoubleHyphen_moreOneArg(x)
                            ? argsMinusHyphen(x).forEach(xs => argMap.set(xs, true))
                            : matchHyphen(x) || matchDoubleHyphen(x)
                                ? argMap.set(removeHyphen(x) , arr[index + 1])
                                : freeArguments.push(x);
    argv.forEach(filterFunc); // For each element run the filter function
    argMap.set("_", freeArguments); // Every element that don't fall into previous cat. goes to this array, and then is bind to "_"
    // console.log(argMap);
    return argMap;
};
module.exports = clamap;
