/* eslint-disable no-undef */
const clamap = require("../index");
test("Not empty", () => {
    expect(clamap(["", ""])).not.beNull;
});
test("Not be equal to input", () => {
    expect(clamap(["", ""])).not.toBe([]);
});
test("When '--' is detected next in the array is his values", ()=> {
    expect(clamap(["", "","--next","2"]).get("next")).toBe("2");
});
test("When '-' is detected next in the array is his value", () =>{
    expect(clamap(["", "", "-n","2"]).get("n")).toBe("2");
});
test("Parameter of type (--flag=value) take the first as key and the second as value", () =>{
    expect(clamap(["", "", "--next=2"]).get("next")).toBe("2");
});
test("Always give you an array with free arguments", () => {
    expect(clamap(["", ""]).get("_")).toEqual([]);
});
test("Free arguments go free arg array", () => {
    expect(clamap(["","", "arg"]).get("_")).toEqual(["arg"]);
});
test("Free flags are true", () => {
    expect(clamap(["", "","--flag","--anotherFlag"]).get("flag")).toBe(true);
    expect(clamap(["", "", "--flag", "--anotherFlag"]).get("anotherFlag")).toBe(true);
});
test(`Argments of type -ABC return:
      A => true
      B => true
      C => true
`, () =>{
    expect(clamap(["", "", "-ABC"]).get("A")).toBe(true);
    expect(clamap(["", "", "-ABC"]).get("B")).toBe(true);
    expect(clamap(["", "", "-ABC"]).get("C")).toBe(true);
});
