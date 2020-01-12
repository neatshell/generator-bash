const createDesc = require("./createDesc");

function createDescLeft(item) {
  function notEmpty(string) {
    return string && string.length;
  }

  const optShort = item.varShort;
  const optLong = item.varLong;

  if (notEmpty(optShort) && notEmpty(optLong)) {
    return "-" + optShort + ", --" + optLong;
  }

  if (notEmpty(optShort) && !notEmpty(optLong)) {
    return "-" + optShort;
  }

  if (!notEmpty(optShort) && notEmpty(optLong)) {
    return "--" + optLong;
  }
}

function formatOptionDesc(items) {
  const descList = [];
  items.forEach(item => {
    descList.push(createDescLeft(item));
  });

  let maxDescLeftLen = 0;
  descList.forEach(descLeft => {
    const curDescLeftLen = descLeft.length;
    if (curDescLeftLen > maxDescLeftLen) {
      maxDescLeftLen = curDescLeftLen;
    }
  });

  descList.forEach((descLeft, i) => {
    const descRight = items[i].varDesc;
    items[i].varUsage = createDesc(descLeft, maxDescLeftLen, descRight);
  });

  return items;
}

module.exports = formatOptionDesc;
