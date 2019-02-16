import express from 'express';
import UserController from '../../controllers/UserController';
import checkEmail from '../../middlewares/checkEmail';
import checkOrganizationType from '../../middlewares/checkOrganizationType';
import UserValidation from '../../middlewares/UserValidation';
import signupValidator from '../../middlewares/signupValidator';

const { signup } = UserController;
const { signupTypeValidator } = UserValidation;
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

export default user;
