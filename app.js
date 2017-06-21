var fs = require('fs'), // access the file system.
    tar = require('tar'), // archiving tools.
    moment = require('moment'),  // date / time tools.
    source = process.env.envA, // environment variable defining the source directory.
    destination = process.env.envB, // environment variable defining the destination directory.
    archiveName = process.env.envArc, // environment variable defining the static part of the TAR file's name.
    searchParameter = process.env.env1, // environment variable defining a file search parameter.
    date = moment().format('YYYYMMDD'), // create a date object for file date comparison and the archive file name.
    fileList = [], // create an empty array to hold relevant file names.
    slack = require('./slack.js'), // import Slack notification functionality.
    nodemailer = require('./nodemailer.js');

// Change working directory the process is running in.   
process.chdir(source);

// Read the files within that directory.
fs.readdir(source, function (err, files) {
    // If there is an error display that error.
    if (err) console.log('>>> File System Error: ' + err);

    // Loop through each file that is found...
    checkFilesPromise(files).then(function (response) {
        console.log('>>> File(s) detected. Starting archiveFilesPromise.');
        
        // Archive any relevant files.
        archiveFilesPromise(fileList).then(function (response) {
            console.log('>>> TAR file written.');
            
            // Send a Slack notification when complete.
            slack('Archive Files Promise', 'good', 'TAR file written.');
            
            // Send an SMTP notification to the process recipients.
            nodemailer('TAR file written.');
        }, function (error) {
            console.log('>>> archiveFilesPromise error: ' + error);
            slack('Archive Files Promise', 'warning', error.toString());
        });
    }, function (error) {
        console.log('>>> CheckFilesPromise error ' + error);
        slack('Check Files Promise', 'warning', error.toString());
    });
});

var checkFilesPromise = function (files) {
    return new Promise(function (resolve, reject) {
        
        files.forEach(function (item) {
            console.log(item);
            // ...check it matches the search parameter...
            if (item.match(searchParameter)) {
                var stats = fs.statSync(item);
                var fileDate = moment(stats.mtime).format('YYYYMMDD');
        
                // ...and current date e.g. today's date.
                if (fileDate === date) {
                    // Add file to an array of file names.
                    console.log('>>> Date match successful, pushing: ' + item);
                    fileList.push(item);
                    //resolve('Success');
                } else {
                    //reject('No files today.');
                }
            }
        });
        if (fileList.length >= 1) {
            resolve('Success');
        } else {
            reject('No files today.');
        }
    });
};

var archiveFilesPromise = function (list) {
    return new Promise(function (resolve, reject) {
        
        if (list.length === 1) {
            // Tar the files in the array to another directory.
            tar.c({}, [list[0]]).pipe(fs.createWriteStream(destination + date + archiveName)).then(resolve('Success'));
        } else if ( list.length === 2) {
            tar.c({}, [list[0], list[1]]).pipe(fs.createWriteStream(destination + date + archiveName)).then(resolve('Success'));
        } else {
            reject('No files to tarball.');
        }
    });
};
