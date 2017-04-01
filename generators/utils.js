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
    'args': [],
    'version': {
      'major' : 0,
      'minor': 1,
      'patch': 0
    }
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
