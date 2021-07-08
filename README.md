# Clamap (Command-line Arguments Map)
Parse arguments to a Map Object.

```
 ./examples/parse -a foo -b bar
 Map(3) {
  '-a' => 'foo',
  '-b' => 'bar',
  '_' => ['foo', 'bar'] 
 }
```

## Usage
```
import clamap from "clamap"
const parsed = clamap(process.argv)
 OR
const parsed = require("clamap")(process.argv)

console.log(parsed.get("-a")) // "foo"
console.log(parsed.get("b")) // "bar"
```
See test/ and examples/ for more documentation



