module.exports = function(that) {
  that.argument("scriptName", {
    required: true,
    type: String
  });
  that.argument("scriptAlias", {
    required: false,
    type: String
  });
  that.option("multi", {
    alias: "m",
    default: false,
    description: "Whether to create a multi commands script",
    hide: false,
    type: Boolean
  });
  that.option("silent", {
    alias: "s",
    default: false,
    description: "Whether to enable silent mode for getopts",
    hide: false,
    type: Boolean
  });
  that.option("shebang", {
    hide: true,
    type: String
  });
};
