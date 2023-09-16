// función principal promesa mdlinks

const { isAbsolute, absolutePaths, existingPaths,isMarkdown,readContent, extractLinks, } = require('./data.js');
let file = 'text.md';

function mdLinks (file) {
    return new Promise ((resolve, reject) => {
      
      if(!isAbsolute(file)){
        file = absolutePaths(file);
      }
      if(existingPaths(file)){
        if(isMarkdown(file)){
          readContent(file).then((content) => {
            resolve(extractLinks(file, content));
          })
        } else {
          reject('Error: el archivo no es markdown');
        }
      } else {
        reject('Error: la ruta no existe');
      } 
  });
}


mdLinks(file)
.then(result => {
   console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

  module.exports = { mdLinks };