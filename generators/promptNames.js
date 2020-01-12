const main = [
  {
    type: "input",
    name: "description",
    message: "Your script description"
  },
  {
    type: "list",
    name: "shebang",
    message: "What interpreter",
    choices: require("./interpreters")
  }
];
const commands = [
  {
    type: "confirm",
    name: "hasCommands",
    message: "Has commands?",
    default: false
  }
];
const args = [
  {
    type: "confirm",
    name: "hasArguments",
    message: "Has arguments?",
    default: false
  }
];
const options = [
  {
    type: "confirm",
    name: "hasOptions",
    message: "Has options?",
    default: false
  }
];
const flags = [
  {
    type: "confirm",
    name: "hasFlags",
    message: "Has flags?",
    default: false
  }
];
const optionPrompts = [
  {
    type: "input",
    name: "varName",
    message: "var name"
  },
  {
    type: "input",
    name: "varShort",
    message: "Option short name"
  },
  {
    type: "input",
    name: "varLong",
    message: "Option long name"
  },
  {
    type: "input",
    name: "varDesc",
    message: "Option description"
  },
  {
    type: "confirm",
    name: "hasAnotherOption",
    message: "Another option?",
    default: false
  }
];
const flagPrompts = [
  optionPrompts[0],
  optionPrompts[1],
  optionPrompts[2],
  optionPrompts[3],
  {
    type: "input",
    name: "varValue",
    message: "flag value"
  },
  {
    type: "confirm",
    name: "hasAnotherFlag",
    message: "Another flag?",
    default: false
  }
];
const argPrompts = [
  optionPrompts[0],
  {
    type: "input",
    name: "varDesc",
    message: "Argument description"
  },
  {
    type: "confirm",
    name: "varMandatory",
    message: "is mandatory?",
    default: false
  },
  {
    type: "confirm",
    name: "hasAnotherArgument",
    message: "Another argument?",
    default: false
  }
];
const commandPrompts = [
  {
    type: "input",
    name: "cmdName",
    message: "Command name"
  },
  {
    type: "input",
    name: "cmdDesc",
    message: "Command description"
  },
  {
    type: "confirm",
    name: "hasAnotherCommand",
    message: "Another command?",
    default: false
  }
];

module.exports = {
  main,
  commandPrompts,
  argPrompts,
  optionPrompts,
  flagPrompts,
  args,
  options,
  flags,
  commands
};
