# Thoth.js

Very simple .md documenter. Recognizes the following comment directives:

* @depends *name* [version]
* @module *name* [inherits *another_name*]
* @description *description*
* @example *example*
* @option *type* *name* [*description*]
* @prop  *type* [proto] *name* [*description*]
* @method *type* [proto] *name*(*arguments*) [*description*]
* @event *name* {*properties*} [*description*]

## Install Script

The install.js script generates a bash script and places a symlink in /usr/bin for calling Thoth.js directly on linux systems.

## License

LGPL

