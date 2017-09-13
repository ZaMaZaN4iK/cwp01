let fs = require('fs');
let path = require('path');

let path_directory = process.argv[2];

let additional_script = "\
let fs = require('fs');\n\
let path = require('path');\n\
let path_directory = '" + path_directory.replace(/\\/gi, '/') + "/' \n\
function read_directory(root)\n\
{\n \
    fs.readdir(root, function(error, files)\n\
    {\n \
        files.forEach(function(item)\n\
        { \n\
            fs.stat(root + '/' + item, function(error, state)\n\
            {\n \
                if(state.isDirectory())\n\
				{\n \
                    current_root = root + '/' + item;\n \
                    read_directory(current_root);\n \
                }\n\
                else\n\
				{\n \
                    console.log(path.relative(path_directory, root + '/' + item));\n \
                } \n \
            });\n \
        });\n \
    });}\n\n\
read_directory(path_directory); \n\
 
