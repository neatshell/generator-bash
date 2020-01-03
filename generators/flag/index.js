const Generator = require("yeoman-generator");
const chalk = require("chalk");
const utils = require("../utils");
const promptNames = require("../promptNames");

module.exports = class extends Generator {
  initializing(scriptName, values) {
    this.argument("scriptName", { type: String, required: true });
    if (!values) {
      values = this.config.get(scriptName);
      if (!values) {
        throw new Error(`No configuration found for script: ${scriptName}`);
      }
    }

    this.values = values;
  }

  prompting(scriptName, values) {
    const that = this;
    const done = that.async();
    const standalone = !values;
    values = values || this.values;

    function promptFlag(hasAnotherFlag) {
      if (hasAnotherFlag) {
        that.prompt(promptNames.flagPrompts).then(function(flagProps) {
          values.flags.push(utils.createFlag(flagProps));
          promptFlag(flagProps.hasAnotherFlag);
        });
      } else {
        done();
      }
    }

    if (standalone) {
      promptFlag(true);
    } else {
      this.log(chalk.yellow("FLAGS"));
      this.prompt(promptNames.flags).then(function(props) {
        promptFlag(props.hasFlags);
      });
    }
  }

  configuring(scriptName, values) {
    if (!values) {
      this.config.set(scriptName, this.values);
      this.config.save();
    }
  }

  writing(scriptName) {
    this.composeWith(require.resolve("../write"), {
      arguments: [scriptName]
    });
  }
};
