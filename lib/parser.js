const meriyah = require("meriyah");
const estraverse = require("estraverse");

/**
 * @param {any} ast
 * @returns {void}
 */
function convert(ast) {
  return estraverse.traverse(ast, {
    // Copied from babel-eslint-parser
    // https://github.com/babel/babel/blob/f8543735a2895b2b3dc23fe8482b21e5ea7de359/eslint/babel-eslint-parser/src/convert/convertAST.cjs#L79-L106
    enter(node) {
      if (node.type === "TemplateLiteral") {
        for (let i = 0; i < node.quasis.length; i++) {
          const q = node.quasis[i];
          q.range[0] -= 1;
          if (q.tail) {
            q.range[1] += 1;
          } else {
            q.range[1] += 2;
          }
          q.loc.start.column -= 1;
          if (q.tail) {
            q.loc.end.column += 1;
          } else {
            q.loc.end.column += 2;
          }
        }
      }
    },
  });
}

/**
 * @param {string} source
 * @param {{jsx?: boolean}} [options]
 */
function parse(source, options = {}) {
  const { jsx = true } = options;
  const tokens = [];
  const comments = [];

  function handleToken(type, start, end, loc) {
    tokens.push({
      type,
      value: source.slice(start, end),
      range: [start, end],
      loc,
    });
  }

  function handleComment(type, value, start, end, loc) {
    comments.push({
      type: type === "MultiLine" ? "Block" : "Line",
      value,
      range: [start, end],
      loc,
    });
  }

  const ast = meriyah.parse(source, {
    ranges: true,
    raw: true,
    loc: true,
    jsx,
    onComment: handleComment,
    onToken: handleToken,
  });

  // @ts-ignore
  ast.comments = comments;
  // @ts-ignore
  ast.tokens = tokens;

  convert(ast);
  return ast;
}

module.exports = { parse };
