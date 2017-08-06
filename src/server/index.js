'use strict';

let crude = require('crude-server');
let url = require('url');
let {
    getFileContent,
    setFileContent,
    getDirectoryContent
} = require('../filer');
let reqBody = require('./reqBody');
let log = console.log; // eslint-disable-line

module.exports = () => {
    return crude((pathname, reqUrl) => {
        log(reqUrl);
        if (pathname === '/api/file/getContent') {
            return runTimeError(async(req, res) => {
                let filePath = url.parse(req.url, true).query.filePath;
                responseSuccess(await getFileContent(filePath), res);
            });
        } else if (pathname === '/api/file/setContent') {
            return runTimeError(async(req, res) => {
                let filePath = url.parse(req.url, true).query.filePath;
                let bodyStr = await reqBody(req);
                await setFileContent(filePath, bodyStr);
                responseSuccess(null, res);
            });
        } else if (pathname === '/api/directory/getContent') {
            return runTimeError(async(req, res) => {
                let filePath = url.parse(req.url, true).query.filePath;
                responseSuccess(await getDirectoryContent(filePath), res);
            });
        }
    });
};

let responseSuccess = (result, res) => {
    res.end(JSON.stringify({
        errno: 0,
        data: result
    }));
};

let runTimeError = (fn) => {
    return async(req, res) => {
        try {
            await fn(req, res);
        } catch (err) {
            res.end(JSON.stringify({
                errno: 1,
                errMsg: `Error happened. Error message: ${err.toString()}`
            }));
            log(err);
        }
    };
};
