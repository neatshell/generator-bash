const
  Generator = require('yeoman-generator'),
  chalk = require('chalk'),
  utils = require('../utils'),
  promptNames = require('../promptNames'),
  fs = require('fs');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('scriptName', {
      required: true,
      type: String
    });
    this.option('silent', {
      alias: 's',
      default: false,
      description: 'Whether to enable silent mode for getopts',
      hide: false,
      type: Boolean
    });
  }

  initializing(scriptName, that) {
    this.values = utils.createValuesMap(this);
    const TARGET_DIR = utils.getDir(this, scriptName);
    const SOURCE_DIR = this.templatePath('../../../snippets/');
    const PREFIX = utils.getPrefix();
    const templates = this.values.templates;
    const snippets = this.values.snippets;

    //create the not-existent dir
    if (!fs.existsSync(TARGET_DIR)) {
      fs.mkdirSync(TARGET_DIR);
    }

    snippets.forEach((snippet, snippetIndex) => {
      let filename = '';
      const templateIndex = templates.indexOf(snippet);
      if (templateIndex >= 0) {
        filename = filename + PREFIX;
        templates[templateIndex] = filename + snippet;
        snippets[snippetIndex] = filename + snippet;
      }
      filename = filename + snippet;
      const data = fs.readFileSync(SOURCE_DIR + snippet);
      fs.writeFileSync(TARGET_DIR + filename, data);
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
