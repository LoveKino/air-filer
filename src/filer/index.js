'use strict';

let promisify = require('es6-promisify');
let fs = require('fs');
let _ = require('lodash');
let path = require('path');

let readdir = promisify(fs.readdir);
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);
let stat = promisify(fs.stat);

/**
 * online file system basic apis
 *
 * TODO Using local file system right now. Change some parts to database later.
 */

let getFileContent = (filePath) => {
    return readFile(filePath, 'utf-8');
};

let setFileContent = (filePath, newContent) => {
    return writeFile(filePath, newContent, 'utf-8');
};

let getDirectoryContent = async(filePath) => {
    let files = await readdir(filePath, 'utf-8');

    let rets = await Promise.all(_.map(files, async(sub) => {
        let childFilePath = path.join(filePath, sub);
        let stats = await stat(childFilePath);
        if (stats.isDirectory()) {
            return {
                type: 'directory',
                path: childFilePath
            };
        } else if (stats.isFile()) {
            return {
                type: 'file',
                path: childFilePath
            };
        } else {
            return null;
        }
    }));

    return _.compact(rets);
};

module.exports = {
    getFileContent,
    setFileContent,
    getDirectoryContent
};
