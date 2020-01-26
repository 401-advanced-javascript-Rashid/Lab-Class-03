'use strict' ;

const fs = require('fs') ;
const util = require('util') ;
const changeData = util.promisify(fs.writeFile) ;
const writer = (jsonData , data) => {
  return changeData(jsonData , data);
};

const readFile = util.promisify(fs.readFile) ;
const reader = (jsonData) => {
  return readFile(jsonData)
    .then( (data) => {
      return data ;
    }).catch (
      error => 
        error,
    );
};

module.exports = {
  read : reader,
  writer,
};
