const interpreters = require('./interpreters');

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

function createValuesMap(scriptName) {
  return {
    'scriptName' : scriptName,
    'shebang': '',
    'description': '',
    'descriptions': [],
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

function prepareValues(values) {
  values['shebang'] = interpreters[values.shebang];
  return values;
}

module.exports = {
  createArgument: createArgument,
  createOption: createOption,
  createFlag: createFlag,
  createValuesMap: createValuesMap,
  prepareValues: prepareValues
};
