function createLeft(opt) {
  function notEmpty(string) {
    return string && string.length;
  }

  const optShort = opt.varShort;
  const optLong = opt.varLong;

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

function formatUsageDesc(options) {
  const varUsageList = [];
  options.forEach(option => {
    varUsageList.push(createLeft(option));
  });

  let max = 0;
  varUsageList.forEach(varUsageLeft => {
    const len = varUsageLeft.length;
    if (len > max) {
      max = len;
    }
  });

  varUsageList.forEach((varUsageLeft, i) => {
    options[i].varUsage = pad(varUsageLeft, max) + options[i].varDesc;
  });

  return options;
}

module.exports = {
  formatUsageDesc: formatUsageDesc
};
