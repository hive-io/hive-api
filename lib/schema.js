'use strict';
let schema = module.exports = {};

schema.RealmSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1, default: 'noNameProvided' },
    fqdn: { type: 'string', minLength: 1 },
    enabled: { type: 'boolean' }
  },
  required: [ 'name', 'fqdn' ],
  additionalProperties: false,
  pk: 'name'
};

schema.UserSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 1, default: 'noUsernameProvided' },
    password: { type: 'string', minLength: 1 },
    realm: { type: 'string', minLength: 1 },
    role: { type: 'string', minLength: 1 }
  },
  required: ['username', 'password', 'realm'],
  additionalProperties: false,
  pk: 'username'
};

schema.GuestSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    connip: { type: 'string' },
    connmac: { type: 'string' },
    prodip: { type: 'string' },
    prodmac: { type: 'string' },
    uuid: { type: 'string' },
    cellip: { type: 'string' },
    user: { type: 'string' },
    status: { type: 'string' },
    profile: { type: 'string' },
    cpuusage: { type: 'integer' },
    mem: { type: 'integer' },
    memusage: { type: 'integer' },
    stamp: { type: 'integer' }
  },
  additionalProperties: false
};

schema.HostSchema = {
  type: 'object',
  properties: {
    hostid: { type: 'string' },
    hostname: { type: 'string' },
    hostip: { type: 'string' },
    maxGuestDensity: { type: 'integer' }
  },
  required: ['hostid'],
  additionalProperties: false
};

schema.UserProfileSchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    hostname: { type: 'string' },
    userprofile: { type: 'string' }
  },
  additionalProperties: false
};

schema.PoolSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    seed: { type: 'string', maxLength: 11 },
    density: {
      type: 'array',
      items: { type: 'integer', minimum: 0 }
    },
    guestProfile: {
      type: 'object',
      properties: {
        cpu: { type: 'integer', minimum: 1, maximum: 8 },
        memory: { type: 'integer', minimum: 1 },
        os: { type: 'string' },
        profileManagement: { type: 'boolean' },
        protocol: { type: 'string' },
        adConfig: {
          type: 'object',
          properties: {
            domain: { type: 'string' },
            ou: { type: 'string' },
            password: { type: 'string' },
            user: { type: 'string' },
            userGroup: { type: 'string' }
          }
        }
      }
    }
  },
  required: ['name', 'seed', 'density'],
  additionalProperties: false
};

schema.TemplateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    status: { type: 'string' },
    diskSize: { type: 'string' },
    usedSpace: { type: 'string' }
  },
  required: ['name'],
  additionalProperties: false
};
