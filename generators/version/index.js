const Generator = require("yeoman-generator");

const MAJOR = "major";
const MINOR = "minor";
const PATCH = "patch";
const BUMPABLES = [MAJOR, MINOR, PATCH];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("scriptName", {
      required: true,
      type: String
    });
    this.argument("bump", {
      type: String,
      required: true,
      description: BUMPABLES.join(" | ")
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
    let version = this.values.version;

    switch (bump) {
      case PATCH:
        version[PATCH]++;
        break;
      case MINOR:
        version[PATCH] = 0;
        version[MINOR]++;
        break;
      case MAJOR:
        version[PATCH] = 0;
        version[MINOR] = 0;
        version[MAJOR]++;
        break;
      default:
        throw new Error(`${bump} is not a valid value`);
    }

    this.config.set(scriptName, this.values);
  }

  writing(scriptName) {
    this.composeWith(require.resolve("../write"), {
      arguments: [scriptName]
    });
  }
};
