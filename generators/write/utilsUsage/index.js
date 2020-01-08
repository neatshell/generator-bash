function createLeft(item) {
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

function pad(varUsageLeft, max) {
  let n = max - varUsageLeft.length;
  let space = "  ";
  while (n > 0) {
    space += " ";
    n -= 1;
  }

  return varUsageLeft + space;
}

function formatUsageDesc(items) {
  const varUsageList = [];
  items.forEach(item => {
    varUsageList.push(createLeft(item));
  });

  let max = 0;
  varUsageList.forEach(varUsageLeft => {
    const len = varUsageLeft.length;
    if (len > max) {
      max = len;
    }
  });

  varUsageList.forEach((varUsageLeft, i) => {
    const varDesc = items[i].varDesc;
    if (varDesc instanceof Array) {
      items[i].varUsage = varDesc
        .map((varDescLine, varDescLineIndex) => {
          if (varDescLineIndex === 0) {
            return pad(varUsageLeft, max) + varDescLine;
          }

          return (
            pad(Array(varUsageLeft.length + 1).join(" "), max) + varDescLine
          );
        })
        .join("\n");
    } else {
      items[i].varUsage = pad(varUsageLeft, max) + varDesc;
    }
  });

  return items;
}

module.exports = {
  formatUsageDesc: formatUsageDesc
};
