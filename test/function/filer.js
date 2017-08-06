'use strict';

let {
    getFileContent,
    setFileContent,
    getDirectoryContent
} = require('../../src/filer');
let assert = require('assert');

let path = require('path');

const fixtureDir = path.join(__dirname, '../fixture');

describe('filer', () => {
    it('getFileContent', async() => {
        let txt = await getFileContent(path.join(fixtureDir, 'test1.txt'));
        assert.equal(txt, 'abdfer\n');
    });

    it('setFileContent', async() => {
        let text = Math.random() + '' + new Date().getTime();
        await setFileContent(path.join(fixtureDir, 'test2.txt'), text);
        let txt = await getFileContent(path.join(fixtureDir, 'test2.txt'));
        assert.equal(txt, text);
    });

    it('getDirectoryContent', async() => {
        let ret = await getDirectoryContent(path.join(fixtureDir, 'test3'));

        assert.deepEqual(ret, [
            {
                type: 'directory',
                path: path.join(fixtureDir, 'test3/a')
            },

            {
                type: 'file',
                path: path.join(fixtureDir, 'test3/b')
            },

            {
                type: 'directory',
                path: path.join(fixtureDir, 'test3/c')
            },

            {
                type: 'file',
                path: path.join(fixtureDir, 'test3/d')
            }
        ]);
    });
});
