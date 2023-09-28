// funciones puras
const path = require('node:path');
const fs = require('node:fs');
const { readFile } = require('node:fs');
const MarkdownIt = require('markdown-it');
const axios = require('axios');

const isAbsolute = (file) => {
    return path.isAbsolute(file);
}

const absolutePaths = (file) => {
    return path.resolve(file);
}

const existingPaths = (file) => {
    return fs.existsSync(file);
}

const isDirectory = (file) =>{
    const stats = fs.statSync(file);
    return stats.isDirectory(file);
}

const isMarkdown = (file) => {
    const extname = path.extname(file);
    return extname === '.md';
}

const readContent = (file) => {
    return new Promise ((resolve, reject) =>{
        readFile(file, 'utf8', (err, data) => {
            if (err) throw err;
            resolve(data);
          });
    });
}

const extractLinks = (file, readContent) => {
    const md = new MarkdownIt;
    const tokens = md.parse(readContent, {});
    const links = [];
    let isInside = false;
    tokens.forEach((token) => {
        if(token.type === 'inline'){
            const inlineTokens = token.children;
            inlineTokens.forEach((inlineToken) => {
                if(inlineToken.type === 'link_open'){
                    isInside = true;
                    links.push({
                        href: inlineToken.attrGet('href'),
                        text: '',
                        file: file || absolutePaths(file),
                    });
                } else if (isInside && inlineToken.type === 'text'){
                    const lastLink = links[links.length -1];
                    lastLink.text += inlineToken.content;
                } else if(isInside && inlineToken.type === 'link_close'){
                    isInside = false;
                }

            });
        }
    });
if (links.length === 0){
    return Promise.reject('No hay links en este archivo');
} else{
    return Promise.resolve(links);
}
}

const linkStatus = (links) => {
    const allLinks = links.map(link => {
        return axios.get(link.href)
        .then(function(response){
            return {
                href: link.href,
                text: link.text,
                file: link.file,
                status: response.status,
                ok: response.status >= 200 && response.status < 400 ? 'ok' : 'fail',
            }
        })
        .catch(function(error) {
             return {
                href: link.href,
                text: link.text,
                file: link.file,
                status: error.response.status,
                ok: 'fail',
            }
        })
        })
        
        return Promise.all(allLinks);
}

const readDirectory = (file) => { 
    const readingDirectory = fs.readdirSync(file);
    return readingDirectory.filter(fileBasename => isMarkdown(fileBasename)).map(fileBasename => path.join(file, fileBasename));
}

const traverseDirectory = (dir) => {
    return new Promise((resolve) => {
        const files = readDirectory(dir);
        const arrayOfFiles = [];
        const count = files.length-1;
        let index = 0;

        const iterator = file => {
            readContent(file).then((content) => {
                extractLinks(file, content)
                .then(links => { 
                    arrayOfFiles.push(links);
                }).finally( () => {
                    index++;
                    if(index <= count){
                        iterator(files[index]);
                    } else {
                        resolve(arrayOfFiles.flat());
                    }
                })

              });
        }
        iterator(files[index]);
    })
}

module.exports = {
isAbsolute,
absolutePaths,
existingPaths,
isDirectory,
isMarkdown,
readContent,
extractLinks,
linkStatus,
readDirectory,
traverseDirectory,
};


