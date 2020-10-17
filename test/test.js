var assert = require('assert');
var chai = require('chai')
  , chaiHttp = require('chai-http');

chai.use(chaiHttp);
var expect = chai.expect;

const apiWorkoutsUrl = "http://localhost:9000";
const note = {
  description: "this is here for testing purposes",
  title: "ztest workout",
  duration: 15,
  equipmentRequired: false,
  createdBy: 1
};
 
//TESTS HERE
describe('Array', function () {
    describe('Adding a workout without user', function () {
      it('return forbidden: 403', function () {
        chai.request(apiWorkoutsUrl).post('/api/v1//workouts').send({ note })
          .then(function(res) {
            expect(res).to.have.status(403);
          })
      });
    });
  });