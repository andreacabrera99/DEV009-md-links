#!/usr/bin/env node

// resolver la promesa e imprimirla en consola
const { statsLinks, statsValidate } = require('./data.js');
const { mdLinks } = require('./mdlinks.js');

const file = process.argv[2];
const argv = process.argv;
const stats = argv.includes('--stats');
const validate = argv.includes('--validate');

console.log(process.argv);

mdLinks(file, validate).then(result => {
  if(stats && !validate){
    console.log(statsLinks(result));
  } if (stats && validate){
    console.log(statsValidate(result));
  }else{
    console.log(result);
  }
  }) 
  .catch(error => {
    console.log(error);
  });