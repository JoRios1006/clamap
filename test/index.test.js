/* eslint-disable no-undef */
const clamap = require("../index");
test("When '--' is detected next in the array is its values", ()=> {
    expect(clamap(["", "","--next","2"]).get("next")).toBe("2");
});
test("When '-' is detected next in the array is its value", () =>{
    expect(clamap(["", "", "-n","2"]).get("n")).toBe("2");
});
test("Parameter of type (--flag=value) take the first as key and the second as value", () =>{
    expect(clamap(["", "", "--next=2"]).get("next")).toBe("2");
});
test("Always give you an array with free arguments", () => {
    expect(clamap(["", ""]).get("_")).toEqual([]);
});
test("Free arguments go free arg array", () => {
    const argumentArr = ["", "", "foo", "bar", "baz"];
    const map = clamap(argumentArr);
    expect(map.get("_")).toEqual(["foo", "bar", "baz"]);
});
test("Free flags are true (--flag)", () => {
    const argumentArr = ["", "", "--flag", "--anotherFlag", "-f"];
    const map = clamap(argumentArr);
    expect(map.get("flag")).toBe(true);
    expect(map.get("anotherFlag")).toBe(true);
    expect(map.get("f")).toBe(true);
});
test(`Argments of type -ABC return:
      A => true
      B => true
      C => true
`, () =>{
    const argumentArr = ["","", "-ABC"];
    const map = clamap(argumentArr);
    expect(map.get("A")).toBe(true);
    expect(map.get("B")).toBe(true);
    expect(map.get("C")).toBe(true);
});
test("Hard test: -x 3 -y 4 -n5 -abc --beep=boop foo bar baz", () =>{
    const argumentArr = ["", "", "-x", "3", "-y", "4", "-n5", "-abc", "--beep=boop", "foo", "bar", "baz"];
    const map = clamap(argumentArr);
    expect(map.get("x")).toBe("3");
    expect(map.get("y")).toBe("4");
    expect(map.get("n")).toBe(true);
    expect(map.get("5")).toBe(true);
    expect(map.get("a")).toBe(true);
    expect(map.get("b")).toBe(true);
    expect(map.get("c")).toBe(true);
    expect(map.get("beep")).toBe("boop");
    expect(map.get("_")).toEqual(["3", "4", "foo", "bar", "baz"]);
});
