// función principal promesa mdlinks

const { isAbsolute, absolutePaths, existingPaths,isDirectory, isMarkdown,readContent, extractLinks, linkStatus, readDirectory, traverseDirectory } = require('./data.js');

function mdLinks (file, validate) {
    return new Promise ((resolve, reject) => {
      if(!isAbsolute(file)){
        file = absolutePaths(file);
      }
      if(existingPaths(file)){
        if(isDirectory(file)){
          traverseDirectory(file).then( (links) => {
            if(!validate){
              resolve(links);
            } else{
              linkStatus(links).then((res) => {
                      resolve(res);
              });
            }
          });
        } else if(isMarkdown(file)){
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

module.exports =  {
  mdLinks
};