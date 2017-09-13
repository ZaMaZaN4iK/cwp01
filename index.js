let fs = require('fs');
let path = require('path');

let path_directory = process.argv[2];


//Checker

if (path_directory != undefined)
{
    fs.stat(path_directory, function(error, stats) 
	{
        if (error || !stats.isDirectory()) 
		{
            console.error("Wrong path");
        }
        else
		{
            fs.writeFile(path_directory + '/summary.js', additional_script, function(error)
			{
                if (error)
				{
                    console.error("Cannot create file");
				}
            });
            console.log('node ' + path_directory + '/summary.js');
        }
    });
} 
else
{
    console.error("Please enter the path");
} 


//Additional script


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
   function create_directory(root)\n\
    {\n\
        let dirs = path.normalize(root).split('/');\n\
        let last_diretory = dirs.pop();\n\
        if(last_diretory == '')\n\
		{\n\
            last_diretory = dirs.pop();\n\
        }\n\
        let new_directory = root + '/' + last_diretory;\n\
        fs.mkdir(new_directory, function (error) {\n\
        if (error)\n\
		{\n\
            console.error('Cannot create directory');\n\
        }\n\
    });\n\
    return new_directory;\n\
};\n\
\n\
let text_directory = create_directory(path_directory);\n\n\
function copy_file(from, to)\n\
{\n\
fs.readFile('config.json', function (error, data) {\n\
    if(error)\n\
	{\n\
        console.error('Cannot read copyright');\n\
    }\n\
    else\n\
	{\n\
        let copyright = JSON.parse(data.toString());\n\
        fs.readdir(from, function(error, files)\n\
        {\n\
            files.forEach(function(item)\n\
            {\n\
                fs.stat(from + '/' + item, function(error, state)\n\
                {\n\
                    if(state.isDirectory())\n\
					{\n\
                        current_root = from + '/' + item;\n\
                        copy_file(current_root, to);\n\
                    }\n\
                    else\n\
					{\n\
                        if (path.extname(item).toLowerCase() == '.txt')\n\
						{\n\
                            let new_file = '';\n\
                            fs.readFile(from + '/' + item, function(error, data)\n\
                            {\n\
                                if (error)\n\
								{\n\
                                    console.error('Cannot read the file');\n\
                                }\n\
                                else\n\
								{\n\
                                    new_file = copyright.copyright + data.toString() + copyright.copyright;\n\
                                    fs.writeFile(to + '/' + item, new_file, 'utf8', function () {});\n\
                                }\n\
                            });\n\
                        }\n\
                    }\n\
                });\n\
            });\n\
        });\n\
    }\n\
});\n\
}\n\
\n\n\
copy_file(path_directory, text_directory);\n\n\
fs.watch(text_directory, {encoding: 'buffer'}, (eventType, filename) => {\n\
    if (filename) { console.log(filename.toString()); }\n\
});\n\n";
