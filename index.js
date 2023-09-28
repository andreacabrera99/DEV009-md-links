// resolver la promesa e imprimirla en consola
const { mdLinks }= require('./mdlinks.js');

let file = 'md';

mdLinks(file, false).then(result => {
   console.log(result);
  })
  .catch(error => {
    console.log(error);
  });