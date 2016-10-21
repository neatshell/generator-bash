module.exports = {
  createOption: function createOption(varName, varShort, varDesc) {
    return {
      varName: varName,
      varShort: varShort,
      varDesc: varDesc
    }
  },

  createFlag: function createFlag(flagName, flagShort, flagDesc) {
    return {
      flagName: flagName,
      flagShort: flagShort,
      flagDesc: flagDesc
    }
  },

  createValuesMap: function createValuesMap() {
    return {
      'shebang': '',
      'description': '',
      'options': [],
      'flags': []
    }
  }
};
