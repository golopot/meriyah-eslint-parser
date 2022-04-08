const parser = require("../lib/parser");

const ast = parser.parse("`a${b}c`");

console.dir(ast, { depth: null });
// console.log(ast)