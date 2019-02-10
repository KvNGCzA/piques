import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import app from '../../../server';

chai.use(chaiHttp);

const { request } = chai;
const signupUrl = '/api/v1/signup';

describe('TEST SIGNUP ROUTE', () => {
  describe('TEST SIGNUP CONTROLLER', () => {
    it('should sign up a new user', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'Test',
          lastName: 'testy',
          email: 'test@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(201);
          expect(status).toBe('success');
          expect(message).toBe('user successfully created');
          done();
        });
    });

    it('should fail to sign up a new user', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'Test',
          lastName: 'testy',
          email: 'test@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(409);
          expect(status).toBe('failure');
          expect(message).toBe('user already exists');
          done();
        });
    });
  });

  describe('TEST SIGNUP VALIDATOR', () => {
    it('should fail to signup if first name is not provided', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: '',
          lastName: 'testy',
          email: 'test1@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { errors: { firstName } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(firstName[0]).toBe('please enter your first name');
          done();
        });
    });

    it('should fail to signup if first name is invalid', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: '8978g',
          lastName: 'testy',
          email: 'test1@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { errors: { firstName } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(firstName[0]).toBe('please enter a valid first name');
          done();
        });
    });

    it('should fail to signup if last name is not provided', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'test',
          lastName: '',
          email: 'test1@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { errors: { lastName } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(lastName[0]).toBe('please enter your last name');
          done();
        });
    });

    it('should fail to signup if last name is invalid', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'test',
          lastName: '45364',
          email: 'test1@yahoo.com',
          password: 'testtesttest'
        })
        .end((err, res) => {
          const { body: { errors: { lastName } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(lastName[0]).toBe('please enter a valid last name');
          done();
        });
    });
  });
});
