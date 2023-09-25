const _ = require("lodash");
const table = require("text-table");

function optionsHelp(_options) {
  const BLACK_LIST = ["skip-cache", "skip-install", "force-install"];

  const options = _.reject(
    _options,
    (x) => BLACK_LIST.includes(x.name) || x.hide
  );

  const rows = options.map((opt) => [
    "",
    opt.alias ? `-${opt.alias}, ` : "",
    `--${opt.name}`,
    opt.description ? ` ${opt.description}` : "",
    opt.default !== undefined && opt.default !== ""
      ? "Default: " + opt.default
      : "",
  ]);

  return table(rows);
}

module.exports = {
  optionsHelp,
};
