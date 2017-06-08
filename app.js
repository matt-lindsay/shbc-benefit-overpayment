var fs = require('fs'),
    EventEmitter = require('events').EventEmitter,
    tar = require('tar'),
    moment = require('moment'),
    source = process.env.envA,
    destination = process.env.envB,
    archiveName = process.env.envArc,
    searchParameter = process.env.env1;

// Change this process's working directory/
process.chdir(source);

// Search for the 'LARE*' files.
fs.readdir(source, function (err, files) {
    // If there is an error display that error.
    if (err) {
        console.log('>>> File System Error: ' + err);
    }
    // Create a variable to log whether there were matched files.
    var writeTar = [];
    // Create a date object for file date comparison and the archive file name.
    var date = moment().format('YYYYMMDD');
    var fileList = [];
    
    // Loop through each file that is found...
    files.forEach(function (item) {
        // ...if the current file's name matches the search parameter...
        if (item.match(searchParameter)) {
            // ...and it's modified property is equal to today...
            fs.stat(item, function (err, stats) {
                if (err) {
                    console.log('>>> File Attributes Error: ' + err);
                }
                //console.log('>>> Date: ' + date);
                //console.log('>>> FIle name: ' + item);
                var fileDate = moment(stats.mtime).format('YYYYMMDD');
                //console.log('>>> File Date: ' + fileDate);
                
                if (fileDate === date) {
                    // ...add to an array of file names.
                    fileList.push(item);
                    console.log('>>> Date match successful: ' + item);
                    // ...update writeTar variable.
                    writeTar.push(item);
                    console.log(writeTar);
                } else {
                    console.log('Date match not present.');
                }
            });
        }
    });
    console.log('>>> WriteTar Length: ' + writeTar.length);
    if (writeTar.length > 0) {
        // Tar the files in the array to another directory.
        tar.c({}, [fileList[0], fileList[1]]).pipe(fs.createWriteStream(destination + archiveName));
    } else {
        //process.exit(0);
    }
});
