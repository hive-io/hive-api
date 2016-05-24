'use strict';
const expect = require('chai').expect,
      api = require('../lib/api');

describe('API Realms', () => {
  it('should list all realms', () => {
    return api.realms.list()
      .then(results => {
        expect(results[0].statusCode).to.equal(200);
        expect(results[1]).to.be.an('array');
      });
  });

//   it('should create a new realm', () => {
//     return api.realms.create({ name: 'ok', fqdn: 'hiveio.local' })
//       .then(results => {
//         console.log(results[0].statusCode, results[1]);
//         expect(results[0].statusCode).to.equal(201);
//         expect(results[1].name).to.equal('ok');
//       });
//   });

//   it('should check the new realm exists', () => {
//     return api.realms.read('ok')
//       .then(results => {
//         let name = JSON.parse(results[1]).name;
//         expect(name).to.equal('ok');
//         expect(results[0].statusCode).to.equal(200);
//       });
//   });

//   it('should prevent creating a new realm with the same name', () => {
//     return api.realms.create({ name: 'ok', fqdn: 'hiveio.local' })
//       .then(results => {
//         console.log(results[0].statusCode, results[1]);
//         expect(results[0].statusCode).to.eql(500);
//       });
//   });

//   it('should update the new realm', () => {
//     return api.realms.update('ok', { name: 'doodle', fqdn: 'google.com' })
//       .then(results => {
//         console.log(results[0].statusCode, results[1]);
//       });
//   });

//   // it('should fail if you try to update the name', () => {
//   //   return api.realms.update('ok', {'name':'dorm','fqdn':'yahoo.com' })
//   //     .then((results) => console.log(results[0].statusCode, results[1]))
//   // })

//   it('should delete ok realm', () => {
//     return api.realms.delete('ok')
//       .then(results => {
//         expect(results[0].statusCode).to.equal(200);
//       });
//   });

//   it('should list all realms', () => {
//     return api.realms.list()
//       .then(results => console.log('results: ' + results[1]));
//   });

//   it('should list all users', () => {
//     return api.users.list()
//       .then(results => console.log(results[0].statusCode, results[1]));
//   });
// });
