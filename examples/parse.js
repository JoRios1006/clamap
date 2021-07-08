const clamap = require("../index");
const parsed = clamap(process.argv);

console.log(parsed);
if(parsed.get("PORT")){
    console.log(parsed.get("PORT"));
}
