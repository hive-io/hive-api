'use strict';
let schema = module.exports = {};

schema.RealmSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, default: 'n' },
    fqdn: { type: 'string', minLength: 1 }
  },
  required: [ 'name', 'fqdn' ],
  additionalProperties: false
};

schema.UserSchema = {
  type: 'object',
  properties: {
    username: {type: 'string', minLength: 1},
    password: {type: 'string', minLength: 1},
    role: {type: 'string', minLength: 1}
  },
  required: ['username', 'password', 'role'],
  additionalProperties: false
};
