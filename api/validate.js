// // FILE: api.js
// function generateCrudApi(endpoints, schema) {
//   let api = {};
//   api.create = function(record) {
//     // validate against passed in schema
//     // if valid POST record to: url(`{baseurl}/${endpoints.singular}`)
//   }
// }

// // define schemas
// const RealmSchema = {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     fqdn: { type: 'string' }
//   },
//   required: [ 'name', 'fqdn' ]
// };

// const UserSchema = {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     password: { type: 'string' }
//   },
//   required: [ 'name', 'password' ]
// };

// // define apis
// module.exports = api = {};
// api.realms = generateCrudAPI({ singular: 'realm', plural: 'realms' }, RealmSchema);
// api.users = generateCrudAPI({ singular: 'user', plural: 'users' }, UserSchema);








// // file: SOMETHING.js
// const api = require('api');
// api.realms.list()
//   .then(realms => console.log(realms));

