const Generator = require('yeoman-generator');
const utils = require('../utils');

module.exports = class extends Generator {
  initializing(scriptName, that) {
    this.values = utils.createValuesMap(this);

    if (that) {
      that.values = this.values;
    }
  }

  configuring(scriptName) {
    this.config.set(scriptName, this.values);
    this.config.save();
  }

  writing(scriptName) {
    this.composeWith(require.resolve('../write'), {
      arguments: [scriptName]
    });
  }
};
