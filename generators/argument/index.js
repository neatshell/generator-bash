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
    this.log(chalk.yellow('ARGUMENTS'));
    const that = this;
    const done = this.async();
    values = values || this.values;

    function promptArgument(hasAnotherArgument) {
      if (hasAnotherArgument) {
        that.prompt(promptNames.argPrompts)
          .then(function (argProps) {
            values.args.push(utils.createArgument(argProps));
            promptArgument(argProps.hasAnotherArgument);
          });
      } else {
        done();
      }
    }

    this.prompt(promptNames.args)
      .then(function (props) {
        promptArgument(props.hasArguments);
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
