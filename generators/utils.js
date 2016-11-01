function createOption(varName, varShort, varLong, varDesc) {
  return {
    varName: varName,
    varLong: varLong,
    varShort: varShort,
    varDesc: varDesc
  }
}

function createFlag(varName, varShort, varLong, varDesc) {
  return {
    varName: varName,
    varShort: varShort,
    varLong: varLong,
    varDesc: varDesc
  }
}

function createArg(varName, varDesc) {
  return {
    varName: varName,
    varDesc: varDesc
  }
}

function createValuesMap() {
  return {
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


function preparevarDescriptions() {

}

function prepareValues(values) {
  var options = values.options;
  var flags = values.flags;
  var descriptions = values.descriptions;
}

module.exports = {
  createOption: createOption,
  createFlag: createFlag,
  createValuesMap: createValuesMap,
  prepareValues: prepareValues,

  createMockValuesMap: function createValuesMap(realValues) {
    return {
      'shebang': realValues.shebang,
      'description': 'My Script description',
      'options': [
        this.createOption('MYOPTIONA', 'a', '', 'My option a description'),
        this.createOption('MYOPTIONB', '', 'optionb', 'My option b description'),
        this.createOption('MYOPTIONC', 'c', 'optionc', 'My option c description')
      ],
      'flags': [
        this.createFlag('MYFLAGD', 'd', '', 'My flag d description'),
        this.createFlag('MYFLAGE', '', 'flage', 'My flag e description'),
        this.createFlag('MYFLAGF', 'f', 'flagf', 'My flag f description')
      ],
      'args': []
    }
  }
};


// ],
// 'args': [
//         createArg('ARG1', 'My Arg1 description'),
//         createArg('ARG2', 'My Arg1 description')
//       ]
//     }
//   }
// };
