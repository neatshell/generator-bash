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
    this.log(chalk.yellow('OPTIONS'));
    const that = this;
    const done = this.async();
    values = values || this.values;

    function promptOption(hasAnotherOption) {
      if (hasAnotherOption) {
        that.prompt(promptNames.optionPrompts)
          .then(function (optionProps) {
            values.options.push(utils.createOption(optionProps));
            promptOption(optionProps.hasAnotherOption);
          });
      } else {
        done();
      }
    }

    this.prompt(promptNames.options)
      .then(function (props) {
        promptOption(props.hasOptions);
      }.bind(this));
  }

  configuring(scriptName, values) {
    if (!values) {
      this.config.set(scriptName, this.values);
      this.config.save();
    }
  }
};
