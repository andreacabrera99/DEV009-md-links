#!/usr/bin/env node

// resolver la promesa e imprimirla en consola
const { statsLinks, statsValidate } = require('./data.js');
const { mdLinks } = require('./mdlinks.js');

const argv = process.argv;
const file = process.argv[2];
const stats = argv.includes('--stats');
const validate = argv.includes('--validate'); 

if(file === undefined){
  console.error('Error: se necesita un archivo');
  return;
}

mdLinks(file, validate).then(result => {
   if(stats && !validate){
    console.log(statsLinks(result));
  } else if (stats && validate){
    console.log(statsValidate(result));
  }else{
    console.log(result);
  }
  }) 
  .catch(error => {
    console.log(error);
  });