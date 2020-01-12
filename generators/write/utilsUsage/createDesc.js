const pad = require("./pad");

function createDesc(descLeft, maxDescLeftLen, descRight) {
  if (descRight instanceof Array) {
    return descRight
      .map((descRightLine, descRightLineIndex) => {
        if (descRightLineIndex === 0) {
          return pad(descLeft, maxDescLeftLen) + descRightLine;
        }

        return (
          pad(Array(descLeft.length + 1).join(" "), maxDescLeftLen) +
          descRightLine
        );
      })
      .join("\n");
  }

  return pad(descLeft, maxDescLeftLen) + descRight;
}

module.exports = createDesc;
