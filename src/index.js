'use strict';

let Server = require('./server');
let log = console.log; // eslint-disable-line

let startServer = (port = 7324) => {
    let {
        start
    } = Server();

    return start(port).then(({address}) => {
        log(`air filer server start at ${address.port}`);
    });
};

module.exports = {
    startServer
};
