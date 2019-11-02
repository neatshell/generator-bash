const
  Generator = require('yeoman-generator'),
  utils = require('../utils'),
  utilsUsage = require('../utilsUsage'),
  utilsFlags = require('../utilsFlags'),
  fs = require('fs'),
  ejs = require('ejs');

module.exports = class extends Generator {
  initializing(scriptName) {
    const values = this.config.get(scriptName);
    if (!values) {
      if (scriptName) {
        throw new Error(`No configuration found for script: ${scriptName}`);
      } else {
        const yoRc = require(this.destinationPath('.yo-rc.json'));
        const scriptNames = Object.keys(yoRc['generator-bash']);
        this.scripts = [];
        scriptNames.forEach((scriptName) => {
          this.scripts.push({
            name: scriptName,
            values: this.config.get(scriptName)
          })
        })
      }
    } else {
      this.scripts = [{
        name: scriptName,
        values: values
      }];
    }
  }

  reading(scriptName) {
    const newScripts = [];
    this.scripts.forEach((script) => {
      const scriptName = script.name;
      const values = script.values;

      const SOURCE_DIR = utils.getDir(this, scriptName);
      const templates = values.templates;
      const snippets = values.snippets;
      const compiled = [];

      snippets.forEach((snippet) => {
        let file = this.fs.read(SOURCE_DIR + snippet);
        const isTemplate = templates.indexOf(snippet) >= 0;
        values.flags = utilsFlags.getValuesFlags(values.flags);
        values.flags = utilsUsage.formatUsageDesc(values.flags);
        values.options = utilsUsage.formatUsageDesc(values.options);
        values._script = `_${scriptName.replace('.','_')}`;

        if (isTemplate) {
          compiled.push(ejs.render(file, values));
        } else {
          compiled.push(file);
        }
      });
      newScripts.push({
        name: scriptName,
        compiled: compiled
      })
    });
    this.scripts = newScripts;
  }

  writing(scriptName) {
    this.scripts.forEach((script) => {
      this.fs.write(script.name, script.compiled.join('\n'));
    })
  }

  end(scriptName) {
    if (scriptName) {
      fs.chmodSync(scriptName, '755');
    }
  }
};
