const {exec} = require('child_process');

const path = process.argv[2];

exec('touch summary.js');
exec("echo 'const {exec} = require('child_process');\n' >> summary.js");
exec("echo 'exec('find .')' >> summary.js");

exec("mkdir temp");
exec("find . -name '*.txt' -exec cp -t temp '{}' +");
exec("find ./temp -name '*.txt' -type f -exec sh -c \"echo 'copyright' >> {}\" \;");
//exec("find ./temp -name \"*.txt\" -type f -exec sh -c \"sed -i '1itask goes here' >> {}\" \;");

