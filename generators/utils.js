module.exports = {
  createOption: function createOption(varName, varShort, varLong, varDesc) {
    return {
      varName: varName,
      varLong: varLong,
      varShort: varShort,
      varDesc: varDesc
    }
  },

  createFlag: function createFlag(flagName, flagShort, flagLong, flagDesc) {
    return {
      flagName: flagName,
      flagShort: flagShort,
      flagLong: flagLong,
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
