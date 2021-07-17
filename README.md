# Clamap (Command-line Arguments Map)
Parse arguments to a Map Object.
```
 ./examples/parse -a foo -b bar
 Map(3) {
  'a' => 'foo',
  'b' => 'bar',
  '_' => ['foo', 'bar'] 
 }
```

## Usage
```
import clamap from "clamap"
const parsed = clamap(process.argv)
 OR
const clamap = require("clamap")
const parsed = clamap(process.argv)

console.log(parsed.get("a")) // "foo"
console.log(parsed.get("b")) // "bar"
```
### What should I expect?
From: `node src/myCode.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz`:

- Expect `parsed.get("x")` to be `"3"`.
- Expect `parsed.get("y")` to be `"4"`.
- Expect `parsed.get("n")` to be `true`.
- Expect `parsed.get("5")` to be `true`.
- Expect `parsed.get("a")` to be `true`.
- Expect `parsed.get("b")` to be `true`.
- Expect `parsed.get("c")` to be `true`.
- Expect `parsed.get("beep")` to be `"boop"`.
- Expect `parsed.get("_")` to equal `["3", "4", "foo", "bar", "baz"]`.



See test/ and examples/ for more documentation



