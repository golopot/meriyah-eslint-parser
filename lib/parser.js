const meriyah = require("meriyah");

/**
 * @param {string} source
 * @param {{jsx?: boolean}} [options]
 */
function parse(source, options = {}) {
  const tokens = [];
  const comments = [];

  function handleToken(type, start, end, loc) {
    tokens.push({
      type,
      loc,
      range: [start, end],
      value: source.slice(start, end),
    });
  }

  function handleComment(type, value, start, end, loc) {
    comments.push({
      type: type === "MultiLine" ? "Block" : "Line",
      loc,
      range: [start, end],
      value,
    });
  }

  const ast = meriyah.parse(source, {
    module: true,
    ranges: true,
    raw: true,
    loc: true,
    jsx: options.jsx,
    onComment: handleComment,
    onToken: handleToken,
  });

  ast.comments = comments;
  ast.tokens = tokens;

  return ast;
}

module.exports = { parse };
