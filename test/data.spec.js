const { isAbsolute, absolutePaths, existingPaths, isMarkdown, readContent, extractLinks } = require('../data.js');

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
    })
})