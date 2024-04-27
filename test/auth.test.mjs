const request = require('supertest');
const app = require('../backend/app');
const chai = require('chai');
const expect = chai.expect;
import "./setupTests"

describe('Authentication API Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        email: 'test1@user.com',
        password: '123456'
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'test1@user.com',
        password: '123456'
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});