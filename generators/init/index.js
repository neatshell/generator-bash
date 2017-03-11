const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  utils = require('../utils'),
  promptNames = require('../promptNames'),
  fs = require('fs');

module.exports = class extends Generator {
  initializing(scriptName, that) {
    this.argument('scriptName', {type: String, required: true});
    this.values = utils.createValuesMap(scriptName);
    const TARGET_DIR = utils.getDir(this, scriptName);
    const SOURCE_DIR = this.templatePath('../../../snippets/');
    const PREFIX = utils.getPrefix();
    const templates = this.values.templates;

    //create the not-existent dir
    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR);
    }

    this.values.snippets.forEach((snippet) => {
      let filename = '';
      if (templates.indexOf(snippet) >= 0) {
        filename = filename + PREFIX;
      }
      filename = filename + snippet;
      fs.linkSync(SOURCE_DIR + snippet, TARGET_DIR + filename);
    });
    if (that) {
      that.values = this.values;
    }
  }

  configuring(scriptName) {
    this.config.set(scriptName, this.values);
    this.config.save();
  }
};
