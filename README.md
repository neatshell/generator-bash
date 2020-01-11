# generator-bash [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
A generator to scaffold out a shell script, with arguments, options and flags handling. 

# Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [Sub-Generators](#sub-generators)
- [License](#license)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-bash using [npm](https://www.npmjs.com/) ([node.js](https://nodejs.org/) is assumed to be installed )

```bash
$ npm install -g yo
$ npm install -g generator-bash
```

## Initialization

When starting a new generable-script project, you will want to: open up a terminal/command prompt, make a new folder, and navigate into it

```bash
$ mkdir my-generable-script-folder && cd $_
```

then, run the bash generator.

```bash
$ yo bash my-script.sh
```

Follow all the prompts and choose what suits you most for the script you would like to create.
When you finish with all of the prompts, your generable-script will be created.

> NOTE: You can also start with a basic blank project and add what you need later (see [init](#init))

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

> NOTE: You should not modify the dotfiles under your generable-script folder, if you want to preserve the automatic
usage generation and the correct input arguments/options reading

## Sub-Generators

* [bash:argument](#argument)
* [bash:option](#option)
* [bash:flag](#flag)
* [bash:version](#version)
* [bash:init](#init)
* [bash:write](#write)

***Note: Generators need to be run from the root directory of your generable-script (Where the .yo-rc.json is located)***

### Argument
Allows to add an input argument inside your script 

#### Example:

```bash
$ yo bash:argument my-script.sh
```

Following the prompts you will choose your argument's variable name and the optional description to show
into the generated usage.

### Option
Allows to add an input option inside your script 

#### Example:

```bash
$ yo bash:option my-script.sh
```

Following the prompts you will choose your option's variable name, short/long name and the optional description to show
into the generated usage.

### Flag
Allows to add an input flag inside your script 

#### Example:

```bash
$ yo bash:flag my-script.sh
```

Following the prompts you will choose your flag's variable name, short/long name and the optional description to show
into the generated usage.

### Version
Allows to handle the version of your script following [semver](http://semver.org/) specs 

#### Example:

```bash
$ yo bash:version my-script.sh patch
```

This will bump the **patch** version of your script changing the output of:

```bash
$ ./my-script.sh --version
```
From
```
0.1.0
```
To
```
0.1.1
```
Other possible values are: **minor** and **major** :
- minor) will bump the minor and reset the patch to 0 e.g. **0.1.1** -> **0.2.0**
- major) will bump the major and reset the minor and the patch to 0 e.g. **0.2.1** -> **1.0.0**


that respectively also reset the patch to 0 and both the minor and the patch to 0

### Init
Initializes a bare generable-script with no arguments, options nor flag. You can add them later by using 
the respective subgenerators or by properly modifying the .yo-rc.json

#### Example:

```bash
$ yo bash:init my-script.sh
```
The output will be
```
create my-script.sh
```
### Write
Called internally by every above described generators, it's the piece of code that converts the data stored into
the .yo-rc.json into the final generated script. You should use this generator only when the .yo-rc.json has been
modified manually to reflect the changes into the script.

```bash
$ yo bash:write my-script.sh
```
The output will be
```
conflict my-script.sh
? Overwrite my-script.sh? (Ynaxdh)
```

with the Yeoman's [conflicter](http://yeoman.io/generator/Conflicter.html) asking you to override the old script. 
Pressing return, the default **Y** will be passed and your script will be updated.

> NOTE: This will also run chmod +x **my-script.sh**

## License

[Apache-2.0](LICENSE) / © Claudio Stella


[npm-image]: https://badge.fury.io/js/generator-bash.svg
[npm-url]: https://npmjs.org/package/generator-bash
[daviddm-image]: https://david-dm.org/neatshell/generator-bash.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/neatshell/generator-bash
