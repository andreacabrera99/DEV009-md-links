const { isAbsolute, absolutePaths, existingPaths, isMarkdown, readContent, extractLinks, linkStatus, isDirectory,readDirectory, statsLinks, statsValidate } = require('../data.js');
const axios = require('axios');
jest.mock('axios');

describe('isAbsolute', () => {
    test('Debería validar una ruta absoluta correctamente', () => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/example.md';
        expect(isAbsolute(file)).toBe(true);
    });
    test('Debería validar una ruta relativa correctamente', () => {
        const file = 'example.md';
        expect(isAbsolute(file)).toBe(false);
    });
})

describe('absolutePaths', () => {
    test('Debería resolver una ruta absoluta', () => {
        const file = 'example.md';
        expect(absolutePaths(file)).toBe('/Users/andreacabrera/proyecto4/DEV009-md-links/example.md');
    });
})

describe('existingPaths', () => {
    test('Debería comprobar la existencia de la ruta', () => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/example.md';
        expect(existingPaths(file)).toBe(true);
    });
    test('Debería comprobar la no existencia de la ruta', () => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/index.md';
        expect(existingPaths(file)).toBe(false);
    });
})

describe('isDirectory', () => {
  test('Debería comprobar que la ruta pertenece a un directorio', () => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/md';
    expect(isDirectory(file)).toBe(true);
  });
  test('Debería comprobar que la ruta no pertenece a un directorio', () => {
    const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/data.js';
    expect(isDirectory(file)).toBe(false);
  });
})

describe('isMarkdown', () => {
    test('Debería comprobar que el archivo es markdown', () => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/example.md';
        expect(isMarkdown(file)).toBe(true);
    });
    test('Debería comprobar que el archivo no es markdown', () => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/index.js';
        expect(isMarkdown(file)).toBe(false);
    });
})

describe('readContent', () => {
    test('Debería leer el contenido del archivo', (done) =>{
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/text.md';
        const expectedData = 'Los unit test son una buena forma de verificar si las funciones funcionan';
        readContent(file).then((response) => {
            expect(response).toEqual(expectedData);
            done();
        })
    });
})

describe('extractLinks', () => {
    test('Debería resolver un arreglo de objetos con los links extraidos del archivo', (done) =>{
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md';
        const readContentData = '[Empanadas](https://es.wikipedia.org/wiki/Empanada) [Tacos de Canasta](https://es.wikipedia.org/wiki/Taco) [Feijoada](https://es.wikipedia.org/wiki/Feijoada)';
        const expectedData = [
            {
              href: 'https://es.wikipedia.org/wiki/Empanada',
              text: 'Empanadas',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Taco',
              text: 'Tacos de Canasta',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Feijoada',
              text: 'Feijoada',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            }
          ]
          extractLinks(file, readContentData).then((response) => {
            expect(response).toEqual(expectedData);
            done();
          })
    });
    test('Debería rechazar la existencia de links dentro del archivo', (done) => {
        const file = '/Users/andreacabrera/proyecto4/DEV009-md-links/text.md';
        const readContentData = 'Los unit test son una buena forma de verificar si las funciones funcionan';
        extractLinks(file, readContentData).catch((response) => {
            expect(response).toBe('No hay links en este archivo');
            done();
        })
    });
})

describe('linkStatus', () => {
    test('Debería resolver un arreglo con el status de los links', () => {
        const links = [
            {
              href: 'https://es.wikipedia.org/wiki/Empanada',
              text: 'Empanadas',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Taco',
              text: 'Tacos de Canasta',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Feijoada',
              text: 'Feijoada',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
            }
          ]
        jest.spyOn(axios, 'get').mockResolvedValue({status: 200})
        return expect(linkStatus(links)).resolves.toEqual([
            {
              href: 'https://es.wikipedia.org/wiki/Empanada',
              text: 'Empanadas',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
              status: 200,
              ok: 'ok'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Taco',
              text: 'Tacos de Canasta',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
              status: 200,
              ok: 'ok'
            },
            {
              href: 'https://es.wikipedia.org/wiki/Feijoada',
              text: 'Feijoada',
              file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
              status: 200,
              ok: 'ok'
            }
          ]);
    });
    test('Debería resolver el status de los links con error dentro de un arreglo', () => {
      const links = [
        {
          href: 'https://www.tumblr.com/hola',
          text: 'Tumblr',
          file: '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md'
        }
      ]
      jest.spyOn(axios, 'get').mockRejectedValue({response:{status: 404}})
      return expect(linkStatus(links)).resolves.toEqual([
        {
          href: 'https://www.tumblr.com/hola',
          text: 'Tumblr',
          file: '/Users/andreacabrera/proyecto4/DEV009-md-links/broken-links.md',
          status: 404,
          ok: 'fail'
        }
      ]);
    });
})

describe('statsLinks', () => {
  test('Debería devolver un objeto con el número de links únicos y totales', () => {
    const links = [
      {
        href: 'https://es.wikipedia.org/wiki/Empanada',
        text: 'Empanadas',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Taco',
        text: 'Tacos de Canasta',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Feijoada',
        text: 'Feijoada',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md'
      }
    ]
    expect(statsLinks(links)).toEqual({ total: 3, unique: 3 });
  });
})

describe('statsValidate', () => {
  test('Debería devolver un objeto con el número de links únicos, totales y rotos', () => {
    const allLinks = [
      {
        href: 'https://es.wikipedia.org/wiki/Empanada',
        text: 'Empanadas',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Taco',
        text: 'Tacos de Canasta',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
        status: 200,
        ok: 'ok'
      },
      {
        href: 'https://es.wikipedia.org/wiki/Feijoada',
        text: 'Feijoada',
        file: '/Users/andreacabrera/proyecto4/DEV009-md-links/links.md',
        status: 200,
        ok: 'ok'
      }
    ]
    expect(statsValidate(allLinks)).toEqual({ total: 3, unique: 3, broken: 0 });
  });
})

describe('readDirectory', () => {
  test('Debería devolver un arreglo con la ruta de los archivos md dentro de una carpeta', () => {
    const file = 'md';
    expect(readDirectory(file)).toEqual([ 'md/FAQ.md', 'md/extra.md' ]);
  });
})

describe