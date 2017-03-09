const
  chalk = require('chalk');

const
  utils = require('./utils'),
  promptNames = require('./promptNames');

function prompt(that) {
  const done = that.async();
  var options = that.values.options;
  var flags = that.values.flags;
  var args = that.values.args;

  function promptArgument(hasAnotherArgument) {
    if (hasAnotherArgument) {
      that.prompt(promptNames.argPrompts)
        .then(function (argProps) {
          args.push(utils.createArgument(argProps));
          promptArgument(argProps.hasAnotherArgument);
        });
    }
    else {
      promptOptions();
    }
  }

  function promptOption(hasAnotherOption) {
    if (hasAnotherOption) {
      that.prompt(promptNames.optionPrompts)
        .then(function (optionProps) {
          options.push(utils.createOption(optionProps));
          promptOption(optionProps.hasAnotherOption);
        });
    }
    else {
      promptFlags();
    }
  }

  function promptFlag(hasAnotherFlag) {
    if (hasAnotherFlag) {
      that.prompt(promptNames.flagPrompts)
        .then(function (flagProps) {
          flags.push(utils.createFlag(flagProps));
          promptFlag(flagProps.hasAnotherFlag);
        });
    }
    else {
      done();
    }
  }

  function promptArguments(self) {
    self.log(chalk.yellow('ARGUMENTS'));
    self.prompt(promptNames.args)
      .then(function (props) {
        promptArgument(props.hasArguments);
      });
  }

  function promptOptions() {
    that.log(chalk.yellow('OPTIONS'));
    that.prompt(promptNames.options)
      .then(function (props) {
        promptOption(props.hasOptions);
      });
  }

  function promptFlags() {
    that.log(chalk.yellow('FLAGS'));
    that.prompt(promptNames.flags)
      .then(function (props) {
        promptFlag(props.hasFlags);
      });
  }

  var mainPrompt = promptNames.main;
  mainPrompt[0].default = that.values['description'];

  that.prompt(mainPrompt)
    .then(function (props) {
      that.values['shebang'] = props.shebang;
      that.values['description'] = props.description;

      promptArguments(that);

    }.bind(that));
}

module.exports = {
  prompt: prompt
};
