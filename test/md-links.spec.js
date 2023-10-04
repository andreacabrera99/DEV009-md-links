const { mdLinks } = require('../mdlinks.js');

describe('mdLinks', () => {

  it('Debería rechazar la promesa si el archivo no es markdown', (done) => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/index.js';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: el archivo no es markdown')
      done();
    })
  });
  it('Debería rechazar la promesa si la ruta no existe', (done) => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/index.md';
    mdLinks(file).catch((response) => {
      expect(response).toBe('Error: la ruta no existe');
      done();
    })
  });
  it('Debería resolver un arreglo con tres objetos', (done) => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md';
    mdLinks(file, false).then((response) => {
      expect(response.length).toBe(3);
      done();
    })
  });
  it('Debería resolver un arreglo que incluya el estado de los links', (done) => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md';
    const expectedData = [
      {
        href: 'https://www.tumblr.com/hola',
        text: 'Tumblr',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md',
        status: 404,
        ok: 'fail'
      }
    ]
    mdLinks(file, true).then((response) => {
      expect(response).toEqual(expectedData);
      done();
    })
  });
  it('Debería resolver un arreglo que no incluya el estado de los links', (done) => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md';
    const expectedData = [
      {
        href: 'https://www.tumblr.com/hola',
        text: 'Tumblr',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md'
      }
    ]
    mdLinks(file, false).then((response) => {
      expect(response).toEqual(expectedData);
      done();
    })
  });
  it('Debería resolver un arreglo que incluya el estado de los links de un archivo extraido de un directorio', (done) => {
    const file = 'md';
    const expectedData = [
      {
        href: 'https://youtu.be/mJJloQY7A8Y',
        text: 'Diferencia entre array y objetos',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://youtu.be/mJJloQY7A8Y?t=236',
        text: '¿Cómo agrego una nueva propiedad a un objeto?',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://youtube.com/01RHn23Bn_0',
        text: '¿Cómo puedo recorrer un objeto?',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 404,
        ok: 'fail'
      },
      {
        href: 'https://youtu.be/bUl1R2lQvKo',
        text: 'map, filter, sort y reduce también son métodos para objetos',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://youtu.be/wlukoWco2zk',
        text: 'Diferencia entre expression y statements',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://www.javascripttutorial.net/javascript-dom/javascript-innerhtml-vs-createelement/',
        text: 'Diferencia entre createElement e innerHTML',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://youtu.be/s-7C09ymzK8',
        text: '¿Qué es el Scope?',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/FAQ.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/extra.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise/all',
        text: 'Cómo iterar un arreglo de promesas - mozilla.org',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/folder/recursos.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://es.javascript.info/recursion',
        text: 'Qué es la recursividad y cómo crear funciones recursivas - javascript.info',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/md/folder/recursos.md',
        status: 200,
        ok: 'ok'
      }
    ] 
    mdLinks(file, true).then((response) => {
      expect(response).toEqual(expectedData);
      done();
    })
  });
})
