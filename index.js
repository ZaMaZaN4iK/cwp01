const {exec} = require('child_process');

const path = process.argv[2];

exec('touch summary.js');
exec("echo 'const {exec} = require('child_process');\n' >> summary.js");
exec("echo 'exec('find .')' >> summary.js");

exec("mkdir temp");

