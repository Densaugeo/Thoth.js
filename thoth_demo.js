process.title = 'Thoth';

var fs = require('fs');
var path = require('path');
var Thoth = require('./Thoth.js');

if(process.argv.length > 2) {
  var sourceFile = process.argv[2];
} else {
  process.exit(0);
}

var thoth = new Thoth();
thoth.document({name: path.basename(sourceFile), sourceCode: fs.readFileSync(sourceFile, 'utf8')});
