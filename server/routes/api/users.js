import express from 'express';
import UserController from '../../controllers/UserController';
import middlewares from '../../middlewares';
import helpers from '../../helpers';

const {
  checkEmail, checkOrganizationType,
  signupValidator, UserValidation,
  verifyToken
} = middlewares;
const { identifyUserByEmail } = helpers;
const { signup, verifyUser, login } = UserController;
const { signupTypeValidator, validateUserLogin } = UserValidation;
const user = express.Router();


// sign user or organization up
user.post(
  '/users/signup',
  checkEmail,
  signupTypeValidator,
  signupValidator,
  checkOrganizationType,
  signup
);

// verify user account
user.put(
  '/users/verify',
  verifyToken,
  verifyUser
);

// log user or organization in
user.post(
  '/users/login',
  validateUserLogin,
  identifyUserByEmail,
  login
);

export default user;
