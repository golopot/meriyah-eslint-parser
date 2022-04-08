const meriyah = require("meriyah");

const tokens = [];
const source = "`${a}b`";
const ast = meriyah.parse(source, {
  onToken(type, start, end) {
    tokens.push({
      type,
      value: source.slice(start, end),
      range: [start, end],
    });
  },
});

console.dir(ast, {depth: null})
console.log(tokens);
