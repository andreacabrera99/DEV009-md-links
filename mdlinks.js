// función principal promesa mdlinks

const { isAbsolute, absolutePaths, existingPaths,isMarkdown, } = require('./data.js');
let file = 'index.js';

function mdLinks (file) {
    return new Promise ((resolve, reject) => {
      if(isAbsolute(file)){
        if(existingPaths(file)){
          if(isMarkdown(file)){
            resolve(file);
          } else {
            reject('Error: el archivo no es markdown');
          }
        } else {
        reject('Error: la ruta no existe');
      } 
    } else {
      if(existingPaths(absolutePaths(file))){
        if(isMarkdown(absolutePaths(file))){
          resolve(absolutePaths(file));
        } else {
          reject('Error: el archivo no es markdown');
        }
      } else {
        reject('Error: la ruta no existe');
      }
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
