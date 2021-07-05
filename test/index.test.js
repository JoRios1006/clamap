/* eslint-disable no-undef */
const main = require("../index");
const testArray = [""];
test("Not empty", () => {
    expect(main(testArray)).not.beNull;
});
test("Not be equal to input", () => {
    expect(main(testArray)).not.toBe([]);
});
test("When '--' is detected next in the array is his values", ()=> {
    expect(main(["--next",2]).get("--next")).toBe(2);
});
test("When '-' is detected next in the array is his value", () =>{
    expect(main(["-n",2]).get("-n")).toBe(2);
});
test("Parameter of type (--flag=value) take the first as key and the second as value", () =>{
    expect(main(["--next=2"]).get("--next")).toBe("2");
});
test("Always give you an array with free arguments", () => {
    expect(main([]).get("_")).toEqual([]);
});
test("Free arguments go free arg array", () => {
    expect(main(["arg"]).get("_")).toEqual(["arg"]);
});
test("Free flags are true", () => {
    expect(main(["--flag","--anotherFlag"]).get("--flag")).toBe(true);
});
test(`Argments of type -ABC return:
      A => true
      B => true
      C => true
`, () =>{
    expect(main(["-ABC"]).get("A")).toBe(true);
    expect(main(["-ABC"]).get("B")).toBe(true);
    expect(main(["-ABC"]).get("C")).toBe(true);
});

