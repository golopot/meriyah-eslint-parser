const parser = require("../lib/parser");
const { performance } = require("perf_hooks");
const estraverse = require("estraverse");

const { readFileSync } = require("fs");

const text = readFileSync("./react.development.js").toString();
// const text = "function f(){}";

s = performance.now();
ast = parser.parse(text, { loc: false });
e = performance.now();
console.log(e - s);text

s = performance.now();

// console.log(JSON.stringify(ast, null, 2));
// console.log(ast);
estraverse.traverse(ast, {
  enter(n) {
    // console.log(n);
  },
});
e = performance.now();

console.log(e - s);
