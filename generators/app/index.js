const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const promptNames = require("../promptNames");
const createOutermostInput = require("../createOutermostInput");
const utilsGeneratorHelp = require("../utilsGeneratorHelp");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    createOutermostInput(this);
  }

  initializing(scriptName, scriptAlias) {
    const values = this.config.get(scriptName);
    if (values) {
      this.values = values;
    } else {
      const that = this;
      const done = that.async();
      that.composeWith(require.resolve("../init"), {
        arguments: [scriptName, scriptAlias, that],
        silent: that.options.silent,
        multi: that.options.multi
      });
      done();
    }
  }

  prompting(scriptName) {
    this.log(
      yosay(
        "Welcome to the " + chalk.yellow.bold("generator-bash") + " generator!"
      )
    );

    const that = this;
    const done = that.async();
    const mainPrompt = promptNames.main;

    mainPrompt[0].default = that.values.description;

    that.prompt(mainPrompt).then(function(props) {
      that.values.shebang = props.shebang;
      that.values.description = props.description;
      if (that.options.multi) {
        that.composeWith(require.resolve("../command"), {
          arguments: [scriptName, that.values]
        });
      } else {
        that.composeWith(require.resolve("../argument"), {
          arguments: [scriptName, that.values]
        });
      }

      that.composeWith(require.resolve("../option"), {
        arguments: [scriptName, that.values]
      });
      that.composeWith(require.resolve("../flag"), {
        arguments: [scriptName, that.values]
      });

      done();
    });
  }

  configuring(scriptName) {
    this.config.set(scriptName, this.values);
    this.config.save();
  }

  writing(scriptName) {
    this.composeWith(require.resolve("../write"), {
      arguments: [scriptName]
    });
  }

  usage() {
    return "yo bash <scriptName> [<scriptAlias>] [options]";
  }

  optionsHelp() {
    return utilsGeneratorHelp.optionsHelp(this._options);
  }
};
