const parser = require("../lib/parser");

q = parser.parse("function f(){}");

console.dir(q, { depth: null });
console.log(q)