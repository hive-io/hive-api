'use strict';
const expect = require('chai').expect,
      api = require('../lib/api');

let NFSpath = '192.168.2.11:/nfs/guests/hi';

let expectStatus = function(res, stCode) {
  expect(res[0].statusCode).to.eql(stCode);
};

describe('Basic API', () => {
  //CREATE AN ARRAY OF APPROPRIATE TESTS
  //realm, user, template, pool, guest
  [
    {
      title: 'Realms',
      currentApi: api.realms,
      pk: 'name',
      currentObject: {
        name: 'realm',
        fqdn: 'hiveio.local',
        enabled: true
      },
      updateObject: {
        name: 'newRealm',
        fqdn: 'newhiveio.local',
        enabled: false
      }
    },
    {
      title: 'Users',
      currentApi: api.users,
      pk: 'username',
      currentObject: {
        username: 'user',
        password: 'password',
        role: 'admin',
        realm: 'local'
      },
      updateObject: {
        username: 'newUser',
        password: 'newPassword',
        role: 'readonly',
        realm: 'hiveio.local'
      }
    },
    {
      title: 'Templates',
      currentApi: api.templates,
      pk: 'name',
      currentObject: {
        name: 'template',
        path: NFSpath,
        os: 'Linux',
        size: 328204288,
        mtime: '2016-05-17T19:33:30.361Z',
        format: 'raw',
        state: 'Not Loaded'
      },
      updateObject: {
        name: 'newTemplate',
        path: NFSpath,
        os: 'Linux',
        size: 328204288,
        mtime: '2016-04-17T19:33:30.361Z',
        format: 'raw',
        state: 'Loaded'
      }
    },
    {
      title: 'Pools',
      currentApi: api.pools,
      pk: 'id',
      currentObject: {
        density: [ 1, 10 ],
        guestProfile: {
          adConfig: {
            domain: 'local',
            ou: 'none',
            password: 'password',
            user: 'user',
            userGroup: 'ugroup'
          },
          backing: 'disk',
          cpu: [1],
          goldImage: 'Tester',
          mem: [128],
          os: 'linux',
          profileManagement: false,
          protocol: 'rdp',
          vlan: null
        },
        id: '3aae5b00-65a9-47d7-b9c4-9fc4c3b1c6f2',
        name: 'loco',
        seed: 'NOBRIETY'
      },
      updateObject: {
        density: [ 2, 10 ],
        guestProfile: {
          adConfig: {
            domain: 'local',
            ou: 'none',
            password: 'password',
            user: 'user',
            userGroup: 'ugroup'
          },
          backing: 'disk',
          cpu: [1],
          goldImage: 'Tester',
          mem: [128],
          os: 'linux',
          profileManagement: false,
          protocol: 'rdp',
          vlan: null
        },
        id: '3aae5b00-65a9-47d7-b9c4-9fc4c3b1c6f3',
        name: 'choco',
        seed: 'BLANKET'
      }
    },
    {
      title: 'Guests',
      currentApi: api.guests,
      pk: 'name',
      currentObject: {
        SessionInfo: [],
        configuration: {
          cpus: 1,
          disk: 2049,
          memory: 128,
          os: 'linux',
          template: 'cruller'
        },
        connip: null,
        cusername: '',
        diskinfo: [
          {
            diskSize: 1688736000,
            diskUsage: 899792000
          }
        ],
        domain: null,
        gueststate: '',
        hostid: null,
        interfaces: [],
        name: 'APPLES0002',
        performance: {
          cpu: 0.5999999999999872,
          memory: 2.2577151229259913,
          timestamp: '2016-05-23T17:50:00.000Z'
        },
        pool: '97a5e704-44d6-4737-8028-a5ce56892561',
        prodip: null,
        prodmac: '52:54:00:b4:4a:2e',
        stamp: 1464025853.76,
        user: null,
        username: '',
        uuid: 'fafcc5ca-caf5-4560-a7b5-9b1e01c4d57c'
      },
      updateObject: {
        SessionInfo: [],
        configuration: {
          cpus: 1,
          disk: 2049,
          memory: 128,
          os: 'linux',
          template: 'cruller'
        },
        connip: null,
        cusername: '',
        diskinfo: [
          {
            diskSize: 1688736000,
            diskUsage: 899792000
          }
        ],
        domain: null,
        gueststate: '',
        hostid: null,
        interfaces: [],
        name: 'APPLES0002',
        performance: {
          cpu: 0.5999999999999872,
          memory: 2.2577151229259913,
          timestamp: '2016-05-23T17:50:00.000Z'
        },
        pool: '97a5e704-44d6-4737-8028-a5ce56892561',
        prodip: null,
        prodmac: '52:54:00:b4:4a:2e',
        stamp: 1464025853.76,
        user: null,
        username: '',
        uuid: 'fafcc5ca-caf5-4560-a7b5-9b1e01c4d57c'
      }

    }
  ].forEach(info => {
    describe(info.title, () => {
      it('should check list', () => {
        return info.currentApi.list()
          .then(results => {
            expectStatus(results, 200);
            let parsed = JSON.parse(results[1]);
            // console.log(parsed);
            expect(parsed).to.be.an('array');
          });
      });

      it('should check create', () => {
        return info.currentApi.create(info.currentObject)
          .then(res => {
            // console.log(res[1]);
            expectStatus(res, 201);
            expect(res[1]).to.eql(info.currentObject);
          });
      });
      it('should check read', () => {
        return info.currentApi.read(info.currentObject[info.pk])
          .then(res => {
            let parsed = JSON.parse(res[1]);
            expectStatus(res, 200);
            expect(parsed).to.eql(info.currentObject);
          });
      });

      it('should check update', () => {
        return info.currentApi.update(info.currentObject[info.pk], info.updateObject)
          .then(res => {
            expectStatus(res, 200);
            let expected = info.updateObject;
            expected[info.pk] = info.currentObject[info.pk];
            expect(res[1]).to.eql(expected);
            /*
              breaks because update currently creates a new document
              when the pk is not id
            */
          });
      });

      it('should check delete', () => {
        return info.currentApi.delete(info.currentObject[info.pk])
          .then(res => expectStatus(res, 200))
          .then(() => info.currentApi.read(info.currentObject[info.pk]))
          .then(res => {
            expectStatus(res, 404);
          });
      });
    });
  });
});
