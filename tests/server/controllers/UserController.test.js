import chai from 'chai';
import chaiHttp from 'chai-http';
import expect from 'expect';
import app from '../../../server';
import helpers from '../../../server/helpers';

chai.use(chaiHttp);

const { createToken } = helpers;
const { request } = chai;
const signupUrl = '/api/v1/users/signup';
const verifyUrl = '/api/v1/users/verify';
let userVerificationToken, organizationVerificationToken;
describe('TEST SIGNUP ROUTE', () => {
  describe('TEST SIGNUP USER CONTROLLER', () => {
    it('should sign up a new user', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'Test',
          lastName: 'testy',
          email: 'test@yahoo.com',
          password: 'testtesttest',
          signupType: 'user'
        })
        .end((err, res) => {
          const { body: { message, status, token }, status: statusCode } = res;
          userVerificationToken = token;
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
          expect(message).toBe('An account with this email already exists');
          done();
        });
    });
  });

  describe('TEST SIGNUP USER VALIDATOR', () => {
    it('should fail to signup if first name is not provided', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: '',
          lastName: 'testy',
          email: 'test1@yahoo.com',
          password: 'testtesttest',
          signupType: 'user'
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
          password: 'testtesttest',
          signupType: 'user'
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
          password: 'testtesttest',
          signupType: 'user'
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
          password: 'testtesttest',
          signupType: 'user'
        })
        .end((err, res) => {
          const { body: { errors: { lastName } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(lastName[0]).toBe('please enter a valid last name');
          done();
        });
    });

    it('should fail to signup if invalid signupType is supplied', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          firstName: 'test',
          lastName: '45364',
          email: 'test1@yahoo.com',
          password: 'testtesttest',
          signupType: 'jhugvyfty'
        })
        .end((err, res) => {
          const { body: { errors: { signupType } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(signupType[0]).toBe('please enter a valid signup type');
          done();
        });
    });
  });

  describe('TEST SIGNUP ORGANIZATION CONTROLLER', () => {
    it('should sign up a new organization', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: 'University of biscuit',
          type: 'Tertiary Institution',
          email: 'uni@bis.com',
          country: 'America',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { message, status, token }, status: statusCode } = res;
          organizationVerificationToken = token;
          expect(statusCode).toBe(201);
          expect(status).toBe('success');
          expect(message).toBe('organization successfully created');
          done();
        });
    });
  });

  describe('TEST SIGNUP ORGANIZATION VALIDATOR', () => {
    it('should fail if country is not provided', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: 'University of biscuit',
          type: 'Tertiary Institution',
          email: 'uniii@bis.com',
          country: '',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { country } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(country[0]).toBe('please select a country');
          done();
        });
    });

    it('should fail if country is not valid', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: 'University of biscuit',
          type: 'Tertiary Institution',
          email: 'uniii@bis.com',
          country: '7t',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { country } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(country[0]).toBe('please select a valid country');
          done();
        });
    });

    it('should fail if name is not provided', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: '',
          type: 'Tertiary Institution',
          email: 'uniii@bis.com',
          country: 'Ghana',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { name } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(name[0]).toBe('please enter a name for your organization');
          done();
        });
    });

    it('should fail if name is not valid', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: '876589',
          type: 'Tertiary Institution',
          email: 'uniii@bis.com',
          country: 'Ghana',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { name } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(name[0])
            .toBe('please enter a valid name for your organization');
          done();
        });
    });

    it('should fail if organization type is invalid', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: 'School of Ghana',
          type: 'Tertia23ry',
          email: 'uniii@bis.com',
          country: 'Ghana',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { type } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(type[0]).toBe('please select a valid organization type');
          done();
        });
    });

    it('should fail if organization type does not exist', (done) => {
      request(app)
        .post(signupUrl)
        .send({
          name: 'School of Ghana',
          type: 'Tertiary',
          email: 'uniii@bis.com',
          country: 'Ghana',
          address: '234 New York, New York',
          password: 'testtesttest',
          signupType: 'organization'
        })
        .end((err, res) => {
          const { body: { errors: { type } }, status: statusCode } = res;
          expect(statusCode).toBe(422);
          expect(type[0]).toBe('please select a valid organization type');
          done();
        });
    });
  });

  describe('TEST VERIFY USER CONTROLLER', () => {
    it('should verify a user', (done) => {
      request(app)
        .put(`${verifyUrl}?token=${userVerificationToken}`)
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(200);
          expect(status).toBe('success');
          expect(message).toBe('user verified successfully');
          done();
        });
    });

    it('should verify an organization', (done) => {
      request(app)
        .put(`${verifyUrl}?token=${organizationVerificationToken}`)
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(200);
          expect(status).toBe('success');
          expect(message).toBe('organization verified successfully');
          done();
        });
    });

    it('should fail to verify if already verified', (done) => {
      request(app)
        .put(`${verifyUrl}?token=${organizationVerificationToken}`)
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(200);
          expect(status).toBe('failure');
          expect(message).toBe('organization is already verified');
          done();
        });
    });

    it('should fail to verify if user does not exist in the database', (done) => {
      const token = createToken({ id: '987f9876753rfeg3978e' });
      request(app)
        .put(`${verifyUrl}?token=${token}`)
        .end((err, res) => {
          const { body: { message, status }, status: statusCode } = res;
          expect(statusCode).toBe(400);
          expect(status).toBe('failure');
          expect(message).toBe('user does not exist');
          done();
        });
    });
  });
});
