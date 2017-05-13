const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  utils = require('../utils'),
  promptNames = require('../promptNames'),
  fs = require('fs'),
  ejs = require('ejs');

const MAJOR = 'major',
      MINOR = 'minor',
      PATCH = 'patch',
      BUMPABLES = [MAJOR, MINOR, PATCH];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('scriptName', {
      required: true,
      type: String
    });
    this.argument('bump', {
      type: String,
      required: true,
      description: BUMPABLES.join(' | ')
    });
  }

  initializing(scriptName, bump) {
    const values = this.config.get(scriptName);
    if (!values) {
      throw new Error(`No configuration found for script: ${scriptName}`);
    }
    if (BUMPABLES.indexOf(bump) < 0) {
      throw new Error(`Not a valid argument: ${bump}`);
    }
    this.values = values;
  }

  bumping(scriptName, bump) {
    var version = this.values.version;

    switch (bump) {
      case PATCH:
        version[PATCH] = version[PATCH] + 1;
        break;
      case MINOR:
        version[PATCH] = 0;
        version[MINOR] = version[MINOR] + 1;
        break;
      case MAJOR:
        version[PATCH] = 0;
        version[MINOR] = 0;
        version[MAJOR] = version[MAJOR] + 1;
        break;
    }
    this.config.set(scriptName, this.values);
  }

  writing(scriptName) {
    this.composeWith(require.resolve('../write'), {
      arguments: [scriptName]
    });
  }
};
