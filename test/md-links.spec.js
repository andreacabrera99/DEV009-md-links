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
  })

});
