// var Ajv = require('ajv');
// var ajv = Ajv(); // options can be passed, e.g. {allErrors: true}

// const RealmSchema = {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     fqdn: { type: 'string' }
//   },
//   required: [ 'name', 'fqdn' ],
// };

// var validateRealm = ajv.compile(RealmSchema);


// // later in the actual method
// function create(record) {
//   var valid = validateRealm(record);
//   if (!valid) {
//     console.log('Invalid: ' + ajv.errorsText(validateRealm.errors));
//     // somehow expose these errors to the calling context, e.g.
//   }
//   else {
//     console.log(valid);

//   }
// };

// create({'name':'olek','fqdn':'google.com'});
