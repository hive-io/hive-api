'use strict';
const expect = require('chai').expect,
      api = require('../lib/api');


let expectStatus = function(res, stCode) {
  expect(res[0].statusCode).to.eql(stCode);
};

describe('Basic API', () => {
  /*
  describe('Realms', () => {
    it('should list all realms', () => {
      return api.realms.list()
        .then(results => {
          expectStatus(results, 200);
          let parsed = JSON.parse(results[1]);
          expect(parsed).to.be.an('array');
        });
    });

    it('should create a new realm', () => {
      return api.realms.create({ name: 'newRealm', fqdn: 'hiveio.local', enabled: true })
        .then(results => {
          expectStatus(results, 201);
          expect(results[1].name).to.equal('newRealm');
        });
    });

    it('should check the new realm exists', () => {
      return api.realms.read('newRealm')
        .then(results => {
          let name = JSON.parse(results[1]).name;
          expect(name).to.equal('newRealm');
          expectStatus(results, 200);
        });
    });

    it('should prevent creating a new realm with the same name', () => {
      return api.realms.create({ name: 'newRealm', fqdn: 'hiveio.local', enabled: true })
        .then(results => {
          expectStatus(results, 500);
        });
    });

    it('should not update the new realm`s name when provided', () => {
      return api.realms.update('newRealm', { name: 'doodle', fqdn: 'google.com' })
        .then(results => {
          expectStatus(results, 200);
          expect(results[1].fqdn).to.eql('google.com');
          expect(results[1].name).to.eql('newRealm');
        });
    });

    it('should update the realm if you provide a new fqdn', () => {
      return api.realms.update('newRealm', { 'fqdn': 'yahoo.com' })
        .then((results) => {
          expectStatus(results, 200);
          expect(results[1].fqdn).to.eql('yahoo.com');
          expect(results[1].name).to.eql('newRealm');
        });
    });

    it('should not find a realm named doodle', () => {
      return api.realms.read('doodle')
        .then(res => {
          expectStatus(res, 404);
        });
    });

    it('should not find a realm named noNameProvided', () => {
      return api.realms.read('noNameProvided')
        .then(res => {
          expectStatus(res, 404);
        });
    });

    it('should delete all realms', () => {
      let firstDel, secondDel, thirdDel;
      return api.realms.delete('newRealm')
        .then(results => {
          firstDel = results;
        })
        .then(() => api.realms.delete('doodle'))
        .then(results => { secondDel = results; })
        .then(() => api.realms.delete('noNameProvided'))
        .then(results => { thirdDel = results; })
        .then(() => {
          expectStatus(firstDel, 200);
          expectStatus(secondDel, 404);
          expectStatus(thirdDel, 404);
        });
    });
  });
  */
  describe('Users', () => {
    it('should list all users', () => {
      return api.users.list()
        .then(results => {
          // console.log(results[0].statusCode, results[1]);
          expectStatus(results, 200);
          let parsed = JSON.parse(results[1]);
          expect(parsed).to.be.an('array');
        });
    });

    it('should create a new user', () => {
      return api.users.create({
        username: 'cain', password: 'admin',
        role: 'admin', realm: 'local'
      })
        .then(results => {
          console.log(results[0].statusCode, results[1]);
          expect(results[0].statusCode).to.equal(201);
          expect(results[1].username).to.equal('cain');
        });
    });

    it('should show user', () => {
      return api.users.list()
        .then(res => console.log(res[1]));
    });

    it('should update the user', () => {
      return api.users.update('cain', {
        username: 'drain', password: 'tandmin',
        realm: 'hiveio.local', role: 'readonly'
      })
      .then(res => {
        expectStatus(res, 200);
        expect(res[1].username).to.eql('cain');
      });
    });

    it('should update the user without providing a username', () => {
      return api.users.update('cain', {
        password: 'bandim',
        realm: 'google.com', role: 'readonly'
      })
      .then(res => {
        expectStatus(res, 200);
        expect(res[1].username).to.eql('cain');
      });
    });

    it('should read the user', () => {
      return api.users.read('cain')
        .then(res => {
          console.log(res[1]);
          expectStatus(res, 200);
          expect(res[1].username).to.eql('cain');
        });
    });

    it('should delete the new user', () => {
      let first, second, third;
      return api.users.delete('cain')
        .then(results => {
          first = results;
          console.log(results[1]);
        })
        .then(() => api.users.delete('drain'))
        .then(res => { second = res; })
        .then(() => api.users.delete('noUsernameProvided'))
        .then(res => { third = res; })
        .then(() => {
          expectStatus(first, 200);
          expectStatus(second, 404);
          expectStatus(third, 404);
        });
    });
  });
});

/*
    it('should list all realms', () => {
      return api.realms.list()
        .then(results => console.log('list of realms: ' + results[1]));
    });
    console.log(results[0].statusCode, results[1]);
*/
