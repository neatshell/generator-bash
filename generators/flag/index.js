const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  utils = require('../utils'),
  promptNames = require('../promptNames');

module.exports = class extends Generator {
  initializing(scriptName, values) {
    this.argument('scriptName', {type: String, required: true});
    if (!values) {
      values = this.config.get(scriptName);
      if (!values) {
        throw new Error(`No configuration found for script: ${scriptName}`);
      }
    }
    this.values = values
  }

  prompting(scriptName, values) {
    this.log(chalk.yellow('FLAGS'));
    const that = this;
    const done = that.async();
    values = values || this.values;

    function promptFlag(hasAnotherFlag) {
      if (hasAnotherFlag) {
        that.prompt(promptNames.flagPrompts)
          .then(function (flagProps) {
            values.flags.push(utils.createFlag(flagProps));
            promptFlag(flagProps.hasAnotherFlag);
          });
      } else {
        done();
      }
    }

    this.prompt(promptNames.flags)
      .then(function (props) {
        promptFlag(props.hasFlags);
      }.bind(this));
  }

  configuring(scriptName, values) {
    if (!values) {
      this.config.set(scriptName, this.values);
      this.config.save();
    }
  }

  writing(scriptName) {
    this.composeWith(require.resolve('../write'), {
      arguments: [scriptName]
    });
  }
};
