const
  interpreters = require('./interpreters'),
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

function createValuesMap(scriptName) {
  return {
    'scriptName' : scriptName,
    'shebang': '',
    'description': '',
    'descriptions': [],
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

function prepare(generator) {
  const values = generator.values;
  const templates = generator.templates;
  const dir = values.dir;
  values['shebang'] = interpreters[values.shebang];

  templates.forEach((template) => {
    const file = generator.fs.read(template.fileName);
    const rendered = ejs.render(file, generator.values);
    generator.fs.write(`${dir}/${template.name}`, rendered);
  });

  return generator;
}

module.exports = {
  createArgument: createArgument,
  createOption: createOption,
  createFlag: createFlag,
  createValuesMap: createValuesMap,
  prepare: prepare
};
