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
    SessionInfo: {
      type: 'array',
      items: {}
    },
    configuration: {
      type: 'object',
      properties: {
        cpus: { type: 'integer' },
        disk: { type: 'integer' },
        memory: { type: 'integer' },
        os: { type: 'string' },
        template: { type: 'string' }
      }
    },
    connip: { type: 'null' },
    cusername: { type: 'string' },
    diskinfo: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          diskSize: { type: 'integer' },
          diskUsage: { type: 'integer' }
        }
      }
    },
    domain: { type: 'null' },
    gueststate: { type: 'string' },
    hostid: { type: 'null' },
    interfaces: {
      type: 'array',
      items: {}
    },
    name: { type: 'string' },
    performance: {
      type: 'object',
      properties: {
        cpu: { type: 'number' },
        memory: { type: 'number' },
        timestamp: { type: 'string' }
      }
    },
    pool: { type: 'string' },
    prodip: { type: 'null' },
    prodmac: { type: 'string' },
    stamp: { type: 'number' },
    user: { type: 'null' },
    username: { type: 'string' },
    uuid: { type: 'string' }
  },
  additionalProperties: false,
  required: ['name'],
  pk: 'name'
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
    id: { type: 'string', default: '0000' },
    guestProfile: {
      type: 'object',
      properties: {
        cpu: {
          type: 'array',
          items: { type: 'integer', minimum: 1, maximum: 8 }
        },
        mem: {
          type: 'array',
          items: { type: 'integer', minimum: 1 }
        },
        os: { type: 'string' },
        profileManagement: { type: 'boolean' },
        protocol: { type: 'string' },
        backing: { type: 'string' },
        goldImage: { type: 'string' },
        vlan: { type: 'null' },
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
  required: ['name', 'seed', 'density', 'id'],
  additionalProperties: false,
  pk: 'id'
};

schema.TemplateSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', default: 'noNameProvided' },
    path: { type: 'string' },
    os: { type: 'string' },
    size: { type: 'integer' },
    mtime: { type: 'string' },
    format: { type: 'string' },
    state: { type: 'string' }
  },
  required: ['name'],
  additionalProperties: false,
  pk: 'name'
};
