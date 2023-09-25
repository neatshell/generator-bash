const snippets = require("./snippets");
const interpreters = require("./interpreters");

function createOption(optionProps) {
  return {
    varName: optionProps.varName,
    varLong: optionProps.varLong,
    varShort: optionProps.varShort,
    varDesc: optionProps.varDesc,
  };
}

function createFlag(flagProps) {
  const option = createOption(flagProps);
  option.varValue = flagProps.varValue;
  return option;
}

function createArgument(argProps) {
  return {
    varName: argProps.varName,
    varDesc: argProps.varDesc,
    varMandatory: Boolean(argProps.varMandatory),
  };
}

function createCommand(cmdProps) {
  return {
    cmdName: cmdProps.cmdName,
    cmdDesc: cmdProps.cmdDesc,
  };
}

function createValuesMap(that) {
  let scriptType = "single";
  const scriptName = that.args[0];
  const scriptAlias = that.args[1];
  let silent;
  let commands;
  const args = [];
  const flags = [];

  if (that.options.multi) {
    scriptType = "multi";
    silent = true;
    args.push(
      createArgument({
        varName: "command",
        varDesc: "The command name",
        varMandatory: true,
      })
    );
    commands = [];
  }

  if (scriptType === "single") {
    silent = that.options.silent;
    flags.push({
      varName: "_VERBOSE",
      varShort: "v",
      varLong: "verbose",
      varValue: 1,
      varDesc: "Enable verbose mode",
    });
  }

  return {
    scriptName,
    scriptAlias,
    shebang: interpreters[0].value,
    silent,
    description: "",
    snippets: snippets[scriptType],
    options: [],
    flags,
    args,
    commands,
    version: {
      major: 0,
      minor: 1,
      patch: 0,
    },
  };
}

function getPrefix() {
  return ".";
}

function getDir(generator, scriptName) {
  return generator.destinationPath(`${getPrefix()}${scriptName}/`);
}

module.exports = {
  createArgument,
  createCommand,
  createOption,
  createFlag,
  createValuesMap,
  getDir,
};
