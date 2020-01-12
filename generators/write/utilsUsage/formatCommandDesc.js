const createDesc = require("./createDesc");

function formatCommandDesc(items) {
  if (items) {
    const descList = [];
    items.forEach(item => {
      descList.push(item.cmdName);
    });

    let maxDescLeftLen = 0;
    descList.forEach(descLeft => {
      const curDescLeftLen = descLeft.length;
      if (curDescLeftLen > maxDescLeftLen) {
        maxDescLeftLen = curDescLeftLen;
      }
    });

    descList.forEach((descLeft, i) => {
      const descRight = items[i].cmdDesc;
      items[i].cmdUsage = createDesc(descLeft, maxDescLeftLen, descRight);
    });

    return items;
  }
}

module.exports = formatCommandDesc;
