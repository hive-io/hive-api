'use strict';
const Promise = require('bluebird'),
      request = require('request'),
      schema = require('./schema'),
      post = Promise.promisify(request.post, { multiArgs: true }),
      put = Promise.promisify(request.put, { multiArgs: true }),
      get = Promise.promisify(request.get, { multiArgs: true }),
      del = Promise.promisify(request.delete, { multiArgs: true }),
      ajv = require('ajv')();

let baseurl = process.env.BASE ? 'http://' + process.env.BASE : 'http://192.168.11.170/api/';
function url(endpoint) { return `${baseurl}${endpoint}`; }

function generateCrudApi(endpoints, sch) {
  let validate = ajv.compile(sch);
  let api = {};

  api.create = function(record) {
    let valid = validate(record);
    if (!valid) {
      return ajv.errorsText(validate.errors);
    }
    return post({ url: url(endpoints.plural), json: record })
      .spread((res, body) => [res, body]);
  };

  api.read = function(id) {
    return get(url(`${endpoints.singular}/${id}`))
      .spread((res, body) => [res, body]);
  };

  api.list = function() {
    return get(url(`${endpoints.plural}`))
      .spread((res, body) => [res, body]);
  };

  api.update = function(id, record) {
    let valid = validate(record);
    if (!valid) {
      return ajv.errorsText(validate.errors);
    }
    return put({ url: url(`${endpoints.singular}/${id}`), json: record })
      .spread((res, body) => [res, body]);
  };

  api.delete = function(id) {
    return del(url(`${endpoints.singular}/${id}`))
      .spread((res, body) => [res, body]);
  };
  return api;
}

let api = module.exports = {};
api.realms = generateCrudApi({singular: 'realm', plural: 'realms'}, schema.RealmSchema);
api.users = generateCrudApi({singular: 'user', plural: 'users'}, schema.UserSchema);
