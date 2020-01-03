const templates = require("./snippets").templates;
const snippets = require("./snippets").snippets;
const interpreters = require("./interpreters");

function createOption(optionProps) {
  return {
    varName: optionProps.varName,
    varLong: optionProps.varLong,
    varShort: optionProps.varShort,
    varDesc: optionProps.varDesc
  };
}

function createFlag(flagProps) {
  return createOption(flagProps);
}

function createArgument(argProps) {
  return {
    varName: argProps.varName,
    varDesc: argProps.varDesc
  };
}

function createValuesMap(that) {
  const scriptName = that.args[0];
  const verboseFlag = {
    varName: "_VERBOSE",
    varShort: "v",
    varLong: "verbose",
    varDesc: "Enable verbose mode"
  };

  return {
    scriptName: scriptName,
    shebang: interpreters[0].value,
    silent: that.options.silent,
    description: "",
    templates: templates,
    snippets: snippets,
    options: [],
    flags: [verboseFlag],
    args: [],
    version: {
      major: 0,
      minor: 1,
      patch: 0
    }
  };
}

function getPrefix() {
  return ".";
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
