process.title = 'thoth_install';

var fs = require('fs');

fs.writeFileSync('thoth.sh', '#!/bin/bash\nnode ' + process.cwd() + '/thoth_demo.js $1\n');
fs.chmodSync(process.cwd() + '/thoth.sh', '774');
fs.symlinkSync(process.cwd() + '/thoth.sh', '/usr/bin/thoth');

console.log('Command "thoth" added to /usr/bin/thoth. Pass in a reference to a single file and get .md docs from stdout');
