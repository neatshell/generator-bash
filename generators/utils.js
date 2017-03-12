const
  templates = require('./templates'),
  snippets = require('./snippets'),
  ejs = require('ejs');

function createOption(optionProps) {
  return {
    varName: optionProps.varName,
    varLong: optionProps.varLong,
    varShort: optionProps.varShort,
    varDesc: optionProps.varDesc
  }
}

function createFlag(flagProps) {
  return createOption(flagProps);
}

function createArgument(argProps) {
  return {
    varName: argProps.varName,
    varDesc: argProps.varDesc
  }
}

function createValuesMap(that) {
  const scriptName = that.args[0];
  return {
    'scriptName' : scriptName,
    'shebang': '',
    'silent': that.options.silent,
    'description': '',
    'templates' : templates,
    'snippets' : snippets,
    'options': [],
    'flags': [],
    'args': []
  }
}

function createOptionDescription(optName, optShort, optLong, optDesc) {
  function notEmpty(string) {
    return string && string.length;
  }

  var optionDescription = {};
  if (notEmpty(optShort) && notEmpty(optLong)) {
    optionDescription.left = '-' + optShort + ', --' + optLong;
    optionDescription.right = optDesc;
    return optionDescription;
  }
  if (notEmpty(optShort) && !notEmpty(optLong)) {
    optionDescription.left = '-' + optShort;
    optionDescription.right = optDesc;
    return optionDescription;
  }
  if (!notEmpty(optShort) && notEmpty(optLong)) {
    optionDescription.left = '--' + optLong;
    optionDescription.right = optDesc;
    return optionDescription;
  }
}

function getPrefix() {
  return '.';
}

function getDir(generator, scriptName) {
  return generator.destinationPath(`${getPrefix()}${scriptName}/`);
}

module.exports = {
  createArgument: createArgument,
  createOption: createOption,
  createFlag: createFlag,
  createValuesMap: createValuesMap,
  getDir: getDir,
  getPrefix: getPrefix
};
