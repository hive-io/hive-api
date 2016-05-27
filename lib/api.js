'use strict';
const Promise = require('bluebird'),
      request = require('request'),
      schema = require('./schema'),
      post = Promise.promisify(request.post, { multiArgs: true }),
      put = Promise.promisify(request.put, { multiArgs: true }),
      get = Promise.promisify(request.get, { multiArgs: true }),
      del = Promise.promisify(request.delete, { multiArgs: true }),
      ajv = require('ajv')({ useDefaults: true });

let baseurl = process.env.BASE ? 'http://' + process.env.BASE : 'http://localhost:8118/api/';
//'http://192.168.11.170/api/';
function url(endpoint) { return `${baseurl}${endpoint}`; }

//OPTIONS sch, endpoints

function generateCrudApi(options) {
  options = options || {};

  if (!options.actions) {
    options.actions = ['create', 'read', 'update', 'list', 'delete'];
  }

  if (!options.schema) {
    throw new Error('No schema provided');
  }

  if (!options.endpoints) {
    throw new Error('No endpoints provided');
  }

  let validate = ajv.compile(options.schema);
  let api = {};

  api.create = function(record) {
    let valid = validate(record);
    if (!valid) {
      throw new Error(ajv.errorsText(validate.errors));
    }
    return post({ url: url(options.endpoints.plural), json: record })
      .spread((res, body) => [res, body]);
  };

  api.read = function(id) {
    let ep = options.endpoints.singular.replace(':id', id);
    return get(url(ep))
      .spread((res, body) => {
        return [res, body];
      });
  };

  api.list = function() {
    return get(url(`${options.endpoints.plural}`))
      .spread((res, body) => [res, body]);
  };

  api.update = function(id, record) {
    let valid = validate(record);
    if (!valid) {
      throw new Error(ajv.errorsText(validate.errors));
    }
    let ep = options.endpoints.singular.replace(':id', id);
    return put({ url: url(ep), json: record })
      .spread((res, body) => [res, body]);
  };

  api.delete = function(id) {
    let ep = options.endpoints.singular.replace(':id', id);
    return del(url(ep))
      .spread((res, body) => [res, body]);
  };

  api.schema = options.schema;
  // Object.keys(api).forEach(function(key) {
  //   if (options.actions.indexOf(key) === -1) {
  //     delete(api.key);
  //   }
  // }); only used if we use user profiles

  return api;
}

let api = module.exports = {};
api.realms = generateCrudApi({
  endpoints: { singular: 'realm/:id', plural: 'realms' },
  schema: schema.RealmSchema
});
api.users = generateCrudApi({
  endpoints: { singular: 'user/:id', plural: 'users' },
  schema: schema.UserSchema
});
api.guests = generateCrudApi({
  endpoints: { singular: 'guest/:id', plural: 'guests' },
  schema: schema.GuestSchema
});
api.hosts = generateCrudApi({
  endpoints: { singular: 'host/:id', plural: 'hosts' },
  schema: schema.HostSchema
});
api.pools = generateCrudApi({
  endpoints: { singular: 'pool/:id', plural: 'pools' },
  schema: schema.PoolSchema
});
api.templates = generateCrudApi({
  endpoints: { singular: 'template/:id', plural: 'templates' },
  schema: schema.TemplateSchema
});
// api.userProfiles = generateCrudApi({
//   endpoints: { singular: 'user/:id/profile', plural: 'user/:id/profile'},
//   actions: ['create', 'update', 'read'], //create is broken here
// });
// not used
