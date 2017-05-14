# generator-bash [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> A generator to scaffold out a shell script handling arguments, options, flags, automatic usage creation and version.

# Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [Sub-Generators](#sub-generators)
- [License](#license)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-bash using [npm](https://www.npmjs.com/) ([node.js](https://nodejs.org/) is assumed to be installed )

```bash
npm install -g yo
npm install -g generator-bash
```

## Initialization

When starting a new generable-script project, you will want to: open up a terminal/command prompt, make a new folder, and navigate into it

```
mkdir my-generable-script-folder && cd $_
```

then, run the bash generator.

```
yo bash my-script.sh
```

Follow all the prompts and choose what suits you most for the script you would like to create.
When you finish with all of the prompts, your generable-script will be created.

Once finished, you will see a structure like below:

```
├── .my-script.sh       # The folder containing all the snippets used to compose
|   |                   # your script. The snippets are listed in the composing order
|   ├── .header
|   ├── .error
|   ├── .log
|   ├── .debug
|   ├── .usage
|   ├── .get_options
|   ├── .get_arguments
|   ├── .init
|   └── body            # The snippet where to put your own logic
|
├── .yo-rc.json         # The yeoman config file where you can change your script config 
|                       # faster than using the provided prompts
|
└── my-script.sh        # Your generated script ready to be run
```

Congratulations! You should now have successfully created a generable-script project.

To start adding your own logic you can modify the **body** snippet and use the provided **subgenerators** to handle 
ARGUMENTs, OPTIONs and FLAGs and also the VERSION of your script. Under the hood, what these subgenerators do, is modifying the 
**.yo-rc.json** configuration file and once understood the mechanisms you can also modify directly this file to speed up 
the workflow or when there's no way with subgenerators to achieve a task for example: renaming an OPTION long or short name 
previously created with the main generator or with the option subgenerator.

## Sub-Generators

* [bash:argument](#argument)
* [bash:option](#option)
* [bash:flag](#flag)

***Note: Generators need to be run from the root directory of your generable-script.***

### Argument
Allows to add an input argument inside your script 

#### Example:

```
$ yo bash:argument my-script.sh
```

Following the prompts you will choose your argument's variable name and the optional description to show
into the generated usage.

### Option
Allows to add an input option inside your script 

#### Example:

```
$ yo bash:option my-script.sh
```

Following the prompts you will choose your option's variable name, short/long name and the optional description to show
into the generated usage.

### Flag
Allows to add an input flag inside your script 

#### Example:

```
$ yo bash:flag my-script.sh
```

Following the prompts you will choose your flag's variable name, short/long name and the optional description to show
into the generated usage.


## License

[Apache-2.0](LICENSE) / © Claudio Stella


[npm-image]: https://badge.fury.io/js/generator-bash.svg
[npm-url]: https://npmjs.org/package/generator-bash
[daviddm-image]: https://david-dm.org/neatshell/generator-bash.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/neatshell/generator-bash
