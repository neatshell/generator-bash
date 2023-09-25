const common = [
  "header",
  "error",
  "log",
  "debug",
  "get_options",
  "get_arguments"
];

module.exports = {
  single: common.concat(["usage", "init", "body"]),
  multi: common.concat([
    "rreadlink",
    "add_command",
    "check_command",
    "usage_multi",
    "init_multi",
    "body"
  ]),
  templates: [
    "header",
    "error",
    "log",
    "debug",
    "usage",
    "usage_multi",
    "get_options",
    "get_arguments",
    "init",
    "init_multi"
  ],
  custom: ["body"]
};
