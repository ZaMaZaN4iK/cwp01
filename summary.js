let fs = require('fs');
let path = require('path');
let path_directory = '/home/zamazan4ik/OpenSource/cwp01/' 
function read_directory(root)
{
     fs.readdir(root, function(error, files)
    {
         files.forEach(function(item)
        { 
            fs.stat(root + '/' + item, function(error, state)
            {
                 if(state.isDirectory())
				{
                     current_root = root + '/' + item;
                     read_directory(current_root);
                 }
                else
				{
                     console.log(path.relative(path_directory, root + '/' + item));
                 } 
             });
         });
     });}

read_directory(path_directory); 
   function create_directory(root)
    {
        let dirs = path.normalize(root).split('/');
        let new_directory = root + '/qwertyuio123';
        fs.mkdir(new_directory, function (error) {
        if (error)
		{
            console.error('Cannot create directory');
        }
    });
    return new_directory;
};

let text_directory = create_directory(path_directory);

function copy_file(from, to)
{
fs.readFile('config.json', function (error, data) {
    if(error)
	{
        console.error('Cannot read copyright');
    }
    else
	{
        let copyright = JSON.parse(data.toString());
        fs.readdir(from, function(error, files)
        {
            files.forEach(function(item)
            {
                fs.stat(from + '/' + item, function(error, state)
                {
                    if(state.isDirectory())
					{
                        current_root = from + '/' + item;
                        copy_file(current_root, to);
                    }
                    else
					{
                        if (path.extname(item).toLowerCase() == '.txt')
						{
                            let new_file = '';
                            fs.readFile(from + '/' + item, function(error, data)
                            {
                                if (error)
								{
                                    console.error('Cannot read the file');
                                }
                                else
								{
                                    new_file = copyright.copyright + data.toString() + copyright.copyright;
                                    fs.writeFile(to + '/' + item, new_file, 'utf8', function () {});
                                }
                            });
                        }
                    }
                });
            });
        });
    }
});
}


copy_file(path_directory, text_directory);

fs.watch(text_directory, {encoding: 'buffer'}, (eventType, filename) => {
    if (filename) { console.log(filename.toString()); }
});

