'use strict';

const
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  ejs = require('ejs');

const
  utils = require('./utils'),
  prompts = require('./prompts');

var self;

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('scriptName', {type: String, required: true});
  },

  initializing: function(scriptName) {
    this.values = utils.createValuesMap(scriptName);
    self = this;
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-bash') + ' generator!'
    ));

    var options = this.values.options;
    var flags = this.values.flags;
    var args = this.values.args;

    function promptArgument(hasAnotherArgument) {
      if (hasAnotherArgument) {
        self.prompt(prompts.argPrompts)
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
        self.prompt(prompts.optionPrompts)
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
        self.prompt(prompts.flagPrompts)
          .then(function (flagProps) {
            flags.push(utils.createFlag(flagProps));
            promptFlag(flagProps.hasAnotherFlag);
          });
      }
      else {
        self._prereading();
      }
    }

    function promptArguments() {
      self.log(chalk.yellow('ARGUMENTS'));
      self.prompt(prompts.args)
        .then(function (props) {
          promptArgument(props.hasArguments);
        });
    }

    function promptOptions() {
      self.log(chalk.yellow('OPTIONS'));
      self.prompt(prompts.options)
        .then(function (props) {
          promptOption(props.hasOptions);
        });
    }

    function promptFlags() {
      self.log(chalk.yellow('FLAGS'));
      self.prompt(prompts.flags)
        .then(function (props) {
          promptFlag(props.hasFlags);
        });
    }

    return this.prompt(prompts.main)
      .then(function (props) {
        this.values['shebang'] = props.shebang;
        this.values['description'] = props.description;

        promptArguments();

      }.bind(this));
  },

  _prereading: function () {
    utils.prepareValues(this.values);
    this._reading();
  },

  _reading: function () {
    var templates = [
      this.fs.read(this.templatePath('header')),
      this.fs.read(this.templatePath('functions/error')),
      this.fs.read(this.templatePath('functions/log')),
      this.fs.read(this.templatePath('functions/debug')),
      this.fs.read(this.templatePath('functions/usage')),
      this.fs.read(this.templatePath('functions/get_options')),
      this.fs.read(this.templatePath('functions/get_arguments')),
      this.fs.read(this.templatePath('functions/init')),
      this.fs.read(this.templatePath('body'))
    ];

      this._writing(templates);
  },

  _writing: function (templates) {
    var rendered = [];

    for (var i = 0; i < templates.length; i++) {
      rendered.push(ejs.render(templates[i], this.values));
    }

    this.fileName = this.destinationPath(this.values.scriptName);
    this.fs.write(this.fileName, rendered.join(''));
  }
});
