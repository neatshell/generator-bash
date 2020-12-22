const Generator = require("yeoman-generator");
const utils = require("../utils");
const createOutermostInput = require("../createOutermostInput");
const utilsGeneratorHelp = require("../utilsGeneratorHelp");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    createOutermostInput(this);
  }

  initializing(scriptName, scriptAlias, that) {
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
    this.composeWith(require.resolve("../write"), {
      arguments: [scriptName]
    });
  }

  optionsHelp() {
    return utilsGeneratorHelp.optionsHelp(this._options);
  }
};
