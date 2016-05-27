'use strict';
const expect = require('chai').expect,
      api = require('../lib/api');

let NFSpath = '192.168.2.11:/nfs/guests/hi';

let expectStatus = function(res, stCode) {
  expect(res[0].statusCode).to.eql(stCode);
};

describe('Advanced Create and Update API', () => {
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
    }
    // {
    //   title: 'Guests',
    //   currentApi: api.guests,
    //   pk: 'name',
    //   currentObject: {
    //     name: 'guest',
    //     connip: '',
    //     connmac: '',
    //     prodip: '',
    //     prodmac: '',
    //     uuid: '',
    //     cellip: { type: 'string' },
    //     user: { type: 'string' },
    //     status: { type: 'string' },
    //     profile: { type: 'string' },
    //     cpuusage: { type: 'integer' },
    //     mem: { type: 'integer' },
    //     memusage: { type: 'integer' },
    //     stamp: { type: 'integer' }
    //   },
    //   updateObject: {
    //     username: 'newUser',
    //     password: 'newPassword',
    //     role: 'readonly',
    //     realm: 'hiveio.local'
    //   }
    // }
  ].forEach(i => {
    describe(i.title, () => {
      it('should create a new document', () => {
        return i.currentApi.create(i.currentObject)
          .then(res => {
            // console.log(res[1]);
            expectStatus(res, 201);
            expect(res[1]).to.eql(i.currentObject);
          });
      });

      it('should prevent creating a new document with the same pk', () => {
        return i.currentApi.create(i.currentObject)
          .then(results => {
            expectStatus(results, 500);
          });
      });

      it('should delete all possible documents and recreate original', () => {
        return i.currentApi.delete(i.currentApi.schema.properties[i.pk].default)
          .then(() => i.currentApi.delete(i.updateObject[i.pk]))
          .then(() => i.currentApi.delete(i.currentObject[i.pk]))
          .then(() => i.currentApi.create(i.currentObject));
      });

      it('should not update the new document`s pk when a full object is provided', () => {
        return i.currentApi.update(i.currentObject[i.pk], i.updateObject)
          .then(results => {
            expectStatus(results, 200);
            let expectedObj = i.updateObject;
            expectedObj[i.pk] = i.currentObject[i.pk];
            expect(results[1]).to.eql(expectedObj);
          });
      });

      it('should delete all possible documents and recreate original', () => {
        return i.currentApi.delete(i.currentApi.schema.properties[i.pk].default)
          .then(() => i.currentApi.delete(i.updateObject[i.pk]))
          .then(() => i.currentApi.delete(i.currentObject[i.pk]))
          .then(() => i.currentApi.create(i.currentObject));
      });

      it('should update the document if you provide a new object without a pk', () => {
        let newObj = i.updateObject;
        delete newObj[i.pk];
        console.log(newObj);
        return i.currentApi.update(i.currentObject[i.pk], newObj)
          .then((results) => {
            console.log(results[1]);
            let expected = newObj;
            expected[i.pk] = i.currentObject[i.pk];
            expectStatus(results, 200);
            expect(results[1]).to.eql(expected);
          });
      });

      it('should delete all possible documents', () => {
        return i.currentApi.delete(i.currentApi.schema.properties[i.pk].default)
          .then(() => i.currentApi.delete(i.updateObject[i.pk]))
          .then(() => i.currentApi.delete(i.currentObject[i.pk]));
      });
    });
  });
});
