// funciones puras
const path = require('node:path');
const fs = require('node:fs');
const MarkdownIt = require('markdown-it');

const isAbsolute = (file) => {
    return path.isAbsolute(file);
}

const absolutePaths = (file) => {
    return path.resolve(file);
}

const existingPaths = (file) => {
    return fs.existsSync(file);
}

const isMarkdown = (file) => {
    const extname = path.extname(file);
    return extname === '.md';
}
module.exports = {
isAbsolute,
absolutePaths,
existingPaths,
isMarkdown,
};


