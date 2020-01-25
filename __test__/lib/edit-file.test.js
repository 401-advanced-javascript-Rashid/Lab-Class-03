'use strict';


const reader = require('../../edit-file');

describe('File Module Open', () => {

  describe('test promes', () => {

    it('when given a real file, returns the contents', (done) => {
      let file = `${__dirname}/data/person.json`;
      reader.readerWithCallback(file, (err, data) => {
        expect(err).toBeUndefined();
        expect(typeof data).toBe('string');
        done();
      });
    });
  });
})