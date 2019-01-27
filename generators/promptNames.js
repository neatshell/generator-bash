const
  main = [
    {
      type: 'input',
      name: 'description',
      message: 'Your script description'
    },
    {
      type: 'list',
      name: 'shebang',
      message: 'What interpreter',
      choices: require('./interpreters')
    }
  ],
  args = [{
    type: 'confirm',
    name: 'hasArguments',
    message: 'Has arguments?',
    default: false
  }],
  options = [{
    type: 'confirm',
    name: 'hasOptions',
    message: 'Has options?',
    default: false
  }],
  flags = [{
    type: 'confirm',
    name: 'hasFlags',
    message: 'Has flags?',
    default: false
  }],
  optionPrompts = [
    {
      type: 'input',
      name: 'varName',
      message: 'var name'
    },
    {
      type: 'input',
      name: 'varShort',
      message: 'Option short name'
    },
    {
      type: 'input',
      name: 'varLong',
      message: 'Option long name'
    },
    {
      type: 'input',
      name: 'varDesc',
      message: 'Option description'
    },
    {
      type: 'confirm',
      name: 'hasAnotherOption',
      message: 'Another option?',
      default: false
    }],
  flagPrompts = [
    optionPrompts[0],
    optionPrompts[1],
    optionPrompts[2],
    optionPrompts[3],
    {
      type: 'confirm',
      name: 'hasAnotherFlag',
      message: 'Another flag?',
      default: false
    }],
  argPrompts = [
    optionPrompts[0],
    {
      type: 'input',
      name: 'varDesc',
      message: 'Argument description'
    },
    {
      type: 'confirm',
      name: 'varMandatory',
      message: 'is mandatory?',
      default: false
    },
    {
      type: 'confirm',
      name: 'hasAnotherArgument',
      message: 'Another argument?',
      default: false
    }];

module.exports = {
  main:  main,
  argPrompts: argPrompts,
  optionPrompts: optionPrompts,
  flagPrompts: flagPrompts,
  args: args,
  options: options,
  flags: flags
};
