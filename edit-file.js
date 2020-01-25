'use strict';


const fs = require('fs');

const util = require('util');


const readerWithCallback = (file, callback) => {
  fs.readFile(file, (err, data) => {
    if (err) { callback(err); }
    else { callback(undefined, data.toString().trim()); }
  });
};


const readFilePromise = util.promisify(fs.readFile);
const readerWithPromise = (file) => {
  return readFilePromise(file)
    .then(contents => contents.toString().trim())
    .catch(error => error);
};

module.exports = { readerWithCallback, readerWithPromise };