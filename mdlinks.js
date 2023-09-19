// función principal promesa mdlinks

const { isAbsolute, absolutePaths, existingPaths,isMarkdown,readContent, extractLinks, linkStatus } = require('./data.js');
let file = 'links.md';

function mdLinks (file, validate) {
    return new Promise ((resolve, reject) => {
      
      if(!isAbsolute(file)){
        file = absolutePaths(file);
      }
      if(existingPaths(file)){
        if(isMarkdown(file)){
          readContent(file).then((content) => {
            const links = extractLinks(file, content);
            if(validate){
              resolve(linkStatus(links));
            } else{
              resolve(links);
            }
          })
        } else {
          reject('Error: el archivo no es markdown');
        }
      } else {
        reject('Error: la ruta no existe');
      } 
  });
}


mdLinks(file, false)
.then(result => {
   console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

  module.exports = { mdLinks };