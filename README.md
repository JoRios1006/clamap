# Clamap (Command-line Arguments Map)
Parse arguments to a Map Object.

```
 ./examples/parse -a foo -b bar
 Map(3) {
  '-a' => 'foo',
  '-b' => 'bar',
  '_' => [] 
 }
```


# Usage
```
import clamap from "clamap"
const parsed = clamap(argv)
 OR
const parsed = require("clamap")(argv)

console.log(parsed.get("-a")) // "foo"
console.log(parsed.get("b")) // "bar"
```



