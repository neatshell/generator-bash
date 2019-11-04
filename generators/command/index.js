const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
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
    const that = this;
    const done = this.async();
    const standalone = !values;
    values = values || this.values;

    function promptCommand(hasAnotherCommand) {
      if (hasAnotherCommand) {
        that.prompt(promptNames.commandPrompts)
          .then(function (cmdProps) {
            values.commands.push(cmdProps.cmdName);
            promptCommand(cmdProps.hasAnotherCommand);
          });
      } else {
        done();
      }
    }

    if (standalone) {
      promptCommand(true);
    } else {
      this.log(chalk.yellow('COMMANDS'));
      this.prompt(promptNames.commands)
        .then(function (props) {
          promptCommand(props.hasCommands);
        }.bind(this));
    }
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
