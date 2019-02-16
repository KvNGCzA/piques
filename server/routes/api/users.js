import express from 'express';
import UserController from '../../controllers/UserController';
import middlewares from '../../middlewares';

const user = express.Router();
const {
  checkEmail, checkOrganizationType,
  signupValidator, UserValidation,
  verifyToken
} = middlewares;
const { signup, verifyUser } = UserController;
const { signupTypeValidator } = UserValidation;


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
user.put('/users/verify', verifyToken, verifyUser);

export default user;
