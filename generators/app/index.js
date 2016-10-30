'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var ejs = require('ejs');

var utils = require('../utils');
var interpreters = require('../interpreters');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-bash') + ' generator!'
    ));

    var choices = Object.keys(interpreters);

    var prompts = {
      main: [
        {
          type: 'input',
          name: 'scriptName',
          message: 'Your script name'
        },
        {
          type: 'input',
          name: 'description',
          message: 'Description'
        },
        {
          type: 'list',
          name: 'shebang',
          message: 'What interpreter',
          choices: choices
        }

      ],
      options: [{
        type: 'confirm',
        name: 'hasOptions',
        message: 'Has options?',
        default: false
      }],
      flags: [{
        type: 'confirm',
        name: 'hasFlags',
        message: 'Has flags?',
        default: false
      }]
    };

    var optionPrompts = [
      {
        type: 'input',
        name: 'varName',
        message: 'var name'
      },
      {
        type: 'input',
        name: 'varShort',
        message: 'short option name'
      },
      {
        type: 'input',
        name: 'varLong',
        message: 'long option name'
      },
      {
        type: 'input',
        name: 'varDesc',
        message: 'description'
      },
      {
        type: 'confirm',
        name: 'hasAnotherOption',
        message: 'Another option?',
        default: false
      }];

    var flagPrompts = [
      {
        type: 'input',
        name: 'flagName',
        message: 'flag name'
      },
      {
        type: 'input',
        name: 'flagShort',
        message: 'short flag name'
      },
      {
        type: 'input',
        name: 'flagLong',
        message: 'long flag name'
      },
      {
        type: 'input',
        name: 'flagDesc',
        message: 'description'
      },
      {
        type: 'confirm',
        name: 'hasAnotherFlag',
        message: 'Another flag?',
        default: false
      }];

    var self = this;
    this.values = utils.createValuesMap();
    var options = this.values.options;
    var flags = this.values.flags;

    function promptOption(hasAnotherOption) {
      if (hasAnotherOption) {
        self.prompt(optionPrompts)
          .then(function (optionProps) {
            options.push(utils.createOption(
              optionProps.varName,
              optionProps.varShort,
              optionProps.varLong,
              optionProps.varDesc));

            promptOption(optionProps.hasAnotherOption);
          });
      }
      else {
        promptFlags();
      }
    }

    function promptFlag(hasAnotherFlag) {
      if (hasAnotherFlag) {
        self.prompt(flagPrompts)
          .then(function (flagProps) {
            flags.push(utils.createFlag(
              flagProps.flagName,
              flagProps.flagShort,
              flagProps.flagLong,
              flagProps.flagDesc));

            promptFlag(flagProps.hasAnotherFlag);
          });
      }
      else {
        self._writing();
      }
    }

    function promptOptions() {
        self.prompt(prompts.options)
          .then(function (props) {
            promptOption(props.hasOptions);
          });
    }

    function promptFlags() {
      self.prompt(prompts.flags)
        .then(function (props) {
          promptFlag(props.hasFlags);
        });
    }

    return this.prompt(prompts.main)
      .then(function (props) {

        this.values['shebang'] = interpreters[props.shebang];
        this.values['description'] = props.description;
        this.scriptName = props.scriptName + '.sh';

        promptOptions();

      }.bind(this));
  },

  _writing: function () {
    var header = this.fs.read(this.templatePath('header'));
    var common = this.fs.read(this.templatePath('common'));
    var usage = this.fs.read(this.templatePath('functions/usage'));
    var get_options = this.fs.read(this.templatePath('functions/get_options'));
    var main = this.fs.read(this.templatePath('main'));

    var renderable = [header, common, usage, get_options, main];

    var rendered = [];

    for (var i = 0; i < renderable.length; i++) {
      rendered.push(ejs.render(renderable[i], this.values));
    }

    rendered.push('main "$@"');

    this.fs.write(this.destinationPath(this.scriptName), rendered.join(''));
  }
});
