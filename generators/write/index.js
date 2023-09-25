const Generator = require("yeoman-generator");
const utils = require("../utils");
const utilsUsage = require("./utilsUsage");
const utilsFlags = require("./utilsFlags");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const snippets = require("../snippets");

const getSnippetPath = (generator, scriptName, snippetName) => {
  const customSnippetPath = path.resolve(
    utils.getDir(generator, scriptName),
    snippetName
  );
  if (!fs.existsSync(customSnippetPath)) {
    const oursSnippetPath = path.resolve(
      generator.templatePath("../../../snippets/"),
      snippetName
    );
    if (fs.existsSync(oursSnippetPath)) {
      return oursSnippetPath;
    }
  }

  return customSnippetPath;
};

// For the scripts of type "multi" this utility return the list of command script
// not yet created
const getUncreatedCommandScripts = (generator, values) => {
  if (values.commands) {
    return values.commands
      .map((command) => command.cmdName)
      .filter((commandScript) => {
        const commandFolder = utils.getDir(generator, commandScript);
        return !fs.existsSync(commandFolder);
      });
  }
};

module.exports = class extends Generator {
  initializing(scriptName) {
    const values = this.config.get(scriptName);
    if (!values) {
      if (scriptName) {
        throw new Error(`No configuration found for script: ${scriptName}`);
      } else {
        const yoRc = require(this.destinationPath(".yo-rc.json"));
        const scriptNames = Object.keys(yoRc["generator-bash"]);
        this.scripts = [];
        scriptNames.forEach((scriptName) => {
          this.scripts.push({
            name: scriptName,
            values: this.config.get(scriptName),
          });
        });
      }
    } else if (values) {
      this.scripts = [
        {
          name: scriptName,
          values,
        },
      ];
    }
  }

  reading() {
    const newScripts = [];
    const commandScriptCreators = [];

    this.scripts.forEach((script) => {
      const scriptName = script.name;
      const { values } = script;
      const templates = values.templates || snippets.templates;
      const compiled = [];
      const uncreatedCommandScripts = getUncreatedCommandScripts(this, values);

      if (uncreatedCommandScripts) {
        uncreatedCommandScripts.forEach((commandScriptName) => {
          const commandScriptCreatorTemplatePath = getSnippetPath(
            this,
            scriptName,
            "command_creator"
          );

          const commandScriptCreatorTemplate = this.fs.read(
            commandScriptCreatorTemplatePath
          );
          const parentName = values.scriptAlias || scriptName;

          commandScriptCreators.push({
            name: commandScriptName,
            compiled: ejs.render(commandScriptCreatorTemplate, {
              commandName: commandScriptName,
              parentName,
              ...values,
            }),
          });
        });
      }

      values.snippets.forEach((snippet) => {
        const filePath = getSnippetPath(this, scriptName, snippet);
        const file = this.fs.read(filePath);
        const isTemplate = templates.indexOf(snippet) >= 0;
        values.flags = utilsFlags.getValuesFlags(values.flags);
        values.flags = utilsUsage.formatOptionDesc(values.flags);
        values.options = utilsUsage.formatOptionDesc(values.options);
        values.commands = utilsUsage.formatCommandDesc(values.commands);
        values._script = `_${scriptName.replace(".", "_").replace("-", "_")}`;

        if (isTemplate) {
          compiled.push(ejs.render(file, values));
        } else {
          compiled.push(file);
        }
      });

      newScripts.push({
        name: scriptName,
        compiled: compiled.join("\n"),
        isNewCommand: !fs.existsSync(utils.getDir(this, scriptName)),
      });
    });

    this.scripts = newScripts;
    this.commandScriptCreators = commandScriptCreators;
  }

  writing() {
    this.scripts.forEach((script) => {
      const scriptName = script.name;
      const scriptCustomFolder = utils.getDir(this, scriptName);
      // The first time that we run the script, the folder containing
      // all the custom snippets doesn't exist, along with "ours" custom snippets
      // defined under snippets.custom. So only for the first run we have to create this stuff.
      if (!fs.existsSync(scriptCustomFolder)) {
        fs.mkdirSync(scriptCustomFolder);
        snippets.custom.forEach((customSnippetName) => {
          const filePath = getSnippetPath(this, scriptName, customSnippetName);
          const file = this.fs.read(filePath);
          this.fs.write(
            path.resolve(scriptCustomFolder, customSnippetName),
            file
          );
        });
      }

      if (script.isNewCommand) {
        fs.writeFileSync(scriptName, script.compiled);
      } else {
        this.fs.write(scriptName, script.compiled);
      }
    });

    if (this.commandScriptCreators.length) {
      this.commandScriptCreators.forEach((commandScriptCreator) => {
        const commandScriptCreatorFilePath = this.destinationPath(
          commandScriptCreator.name
        );
        this.fs.write(
          commandScriptCreatorFilePath,
          commandScriptCreator.compiled
        );
      });
    }
  }

  end(scriptName) {
    if (scriptName) {
      fs.chmodSync(scriptName, "755");
    }

    if (this.commandScriptCreators.length) {
      this.commandScriptCreators.forEach((commandScriptCreator) => {
        fs.chmodSync(this.destinationPath(commandScriptCreator.name), "755");
      });
    }
  }
};
