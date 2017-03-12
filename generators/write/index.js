const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  utils = require('../utils'),
  promptNames = require('../promptNames'),
  fs = require('fs'),
  ejs = require('ejs');

module.exports = class extends Generator {
  initializing(scriptName) {
    this.argument('scriptName', {type: String, required: true});
    const values = this.config.get(scriptName);
    if (!values) {
      throw new Error(`No configuration found for script: ${scriptName}`);
    }
    this.values = values;
  }

  reading(scriptName) {
    const SOURCE_DIR = utils.getDir(this, scriptName);
    const templates = this.values.templates;
    const snippets = this.values.snippets;

    let compiled = [];

    snippets.forEach((snippet) => {
      let file = this.fs.read(SOURCE_DIR + snippet);
      const isTemplate = templates.indexOf(snippet) >= 0;
      if (isTemplate) {
        compiled.push(ejs.render(file, this.values));
      } else {
        compiled.push(file);
      }
    });
    this.compiled = compiled;
  }

  writing(scriptName) {
    this.fs.write(scriptName, this.compiled.join('\n'));
  }

  end(scriptName) {
    fs.chmodSync(scriptName, '755');
  }
};
