// función principal promesa mdlinks

const { isAbsolute, absolutePaths, existingPaths,isDirectory, isMarkdown,readContent, extractLinks, linkStatus, readDirectory } = require('./data.js');
let file = 'md/FAQ.md';

function mdLinks (file, validate) {
    return new Promise ((resolve, reject) => {
      
      if(!isAbsolute(file)){
        file = absolutePaths(file);
      }
      if(existingPaths(file)){
        if(isMarkdown(file)){
          readContent(file).then((content) => {
            extractLinks(file, content).then(links => {
              if(validate){
                resolve(linkStatus(links));
              } else{
                resolve(links);
              }
            })
          })
        } else {
          reject('Error: el archivo no es markdown');
        }
      } else {
        reject('Error: la ruta no existe');
      } 
  });
}


mdLinks(file, true)
.then(result => {
   console.log(result);
  })
  .catch(error => {
    console.log(error);
  });

  module.exports = { mdLinks };