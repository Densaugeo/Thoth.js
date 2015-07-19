# Thoth.js

Very simple .md documenter. Reads source files and returns .md files.

[![Code Climate](https://codeclimate.com/github/Densaugeo/Thoth.js/badges/gpa.svg)](https://codeclimate.com/github/Densaugeo/Thoth.js)
[![Build Status](https://travis-ci.org/Densaugeo/Thoth.js.svg?branch=master)](https://travis-ci.org/Densaugeo/Thoth.js)



## Installation

Install with npm:

~~~
npm install --save thoth-doc
~~~

Note the name. 'thoth' was already taken, so the package is 'thoth-doc'.

## Usage

Thoth adds the shell script `thoth`, which accepts a source file as input and outputs an .md file.

Add to your package.json scripts object:

~~~
"scripts": {
  "doc": "thoth your_script.js > doc/your_script.md"
}
~~~

And run `npm run doc`.

## Call from shell

To call Thoth directly from the shell, install it globally:

~~~
npm install -g thoth-doc
thoth your_script.js > doc/your_script.md
~~~

## Annotation

Recognizes the following comment directives:

* @depends *name* [version]
* @module *name* [inherits *another_name*]
* @description *description*
* @example *example*
* @option *type* *name* [*description*]
* @prop  *type* [proto] *name* [*description*]
* @method *type* [proto] *name*(*arguments*) [*description*]
* @event *name* {*properties*} [*description*]

Directives must be on a single line.

## License

LGPL

