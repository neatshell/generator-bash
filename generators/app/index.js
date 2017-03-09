'use strict';

const
  yeoman = require('yeoman-generator'),
  chalk = require('chalk'),
  yosay = require('yosay'),
  ejs = require('ejs');

const
  utils = require('./utils'),
  prompts = require('./prompts');

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments);
    this.argument('scriptName', {type: String, required: true});
  },

  initializing: function(scriptName) {
    this.values = this.config.get('values') || utils.createValuesMap(scriptName);
  },

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-bash') + ' generator!'
    ));
    prompts.prompt(this);
  },

  configuring: function() {
    utils.prepareValues(this.values);
    this.templates = [
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
  },

  writing: function () {
    var rendered = [];
    this.config.set('values', this.values);
    this.config.save();

    for (var i = 0; i < this.templates.length; i++) {
      rendered.push(ejs.render(this.templates[i], this.values));
    }

    this.fileName = this.destinationPath(this.values.scriptName);
    this.fs.write(this.fileName, rendered.join(''));
  }
});
