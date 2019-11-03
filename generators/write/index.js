const Generator = require('yeoman-generator');
const utils = require('../utils');
const utilsUsage = require('../utilsUsage');
const utilsFlags = require('../utilsFlags');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const snippets = require('../snippets');

const getSnippetPath = (that, scriptName, snippetName) => {
  const customSnippetPath = path.resolve(utils.getDir(that, scriptName), snippetName);
  if (!fs.existsSync(customSnippetPath)) {
    if (snippets.snippets.includes(snippetName)) {
      return path.resolve(that.templatePath('../../../snippets/'), snippetName);
    }
  }
  return customSnippetPath;
};

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
      const templates = values.templates;
      const snippets = values.snippets;
      const compiled = [];

      snippets.forEach((snippet) => {
        const filePath = getSnippetPath(this, scriptName, snippet);
        const file = this.fs.read(filePath);
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
    const scriptCustomFolder = utils.getDir(this, scriptName);
    // The first time that we run the script, the folder containing
    // all the custom snippets doesn't exist, along with "ours" custom snippets
    // defined under snippets.custom. So only for the first run we have to create this stuff.
    if (!fs.existsSync(scriptCustomFolder)) {
      fs.mkdirSync(scriptCustomFolder);
      snippets.custom.forEach((customSnippetName) => {
        const filePath = getSnippetPath(this, scriptName, customSnippetName);
        const file = this.fs.read(filePath);
        this.fs.write(path.resolve(scriptCustomFolder, customSnippetName), file);
      });
    }
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
