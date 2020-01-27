'use strict';


const fs = require('fs');
const path = require('path');
const editor = require('../../edit-file') ;


describe('file modules' , () => {

  describe('using promise ' , () => {
    it('Read the file as a string' , () => {
      let jsonData = `${__dirname}/../../data/person.json`;
      fs.readFile(jsonData, function (err, data) {
        if (err) throw err;
        if(data.indexOf('search string') >= 0){
          expect(typeof data).toBe('string');
          return editor.reader(jsonData);
        }
      });
    });

    it('Accept the Data as a command line parameter' , () => {
      let jsonData = `${__dirname}/../../data/person.json`;
      fs.readFile(jsonData, function (err, data) {
        if (err) throw err;
        if(data.indexOf('search string') >= 0){
          let addData = process.argv[process.argv.length-1];
          process.argv.push(path.basename(jsonData));
          expect(addData).toEqual(path.basename(jsonData));
        }
      }); 
    });


    it('the format Data stay the same after the change', () => {
      let jsonData = `${__dirname}/../../data/person.json`;
      return editor.read(jsonData)
        .then( (data) => { 
          let jsonData = JSON.parse(data.toString().trim());
          return jsonData ;
        })
        .then((data) => {
          data.firstName = 'Rashid' ;
          return editor.writer(jsonData, Buffer.from(JSON.stringify(data)));
        })
        .then(() => {
          return editor.reader(jsonData)
            .then( (data) => { 
              return expect(data.toString().trim()).toEqual('string');
            });
        })
        .catch((error) => { 
          return error ;
        });    
    });
  });  
});

// it('format Data stay th same after the change', () => {
//   let jsonData = `${__dirname}/../../data/person.json`;
//   return editor.reader(jsonData)
//     .then( (data) => { 
//       return JSON.parse(JSON.stringify(data[0]));
//     })
//     .then((data) => {
//       data.favoriteFoods = ['mansef','makloba','mlokya']; 
//       return editor.writer(jsonData, Buffer.from(JSON.stringify(data[0])));
//     })
//     .then(() => {
//       return editor.reader(jsonData)
//         .then( (data) => { 
              
//           return expect(data.toArray().trim()).toEqual(Array.isArray(data));
//         });
//     }); 
// });