var fs = require('fs'),
    tar = require('tar'),
    moment = require('moment'),
    source = process.env.envA,
    destination = process.env.envB,
    archiveName = process.env.envArc,
    searchParameter = process.env.env1;

console.log(process.cwd());    
process.chdir(source);
console.log(process.cwd());

// Search for the 'LARE*' files.
fs.readdir(source, function (err, files) {
    // If there is an error display that error.
    if (err) {
        console.log('>>> File System Error: ' + err);
    }
    var fileList = [];
    // Loop through each file that is found...
    files.forEach(function (item) {
        // ...if the current file's name matches the search parameter...
        if (item.match(searchParameter)) {
            // ...add to an array of file names.
            fileList.push(item);
        }
    });
    // Create a date object for the archive file name.
    var date = moment();
    // Tar the files in the array to another directory.
    tar.c({}, [fileList[0], fileList[1]]).pipe(fs.createWriteStream(destination + date.format('YYYYMMDD') + archiveName));
});