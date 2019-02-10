import express from 'express';
import UserController from '../../controllers/UserController';
import UserValidation from '../../middlewares/UserValidation';
import checkUser from '../../middlewares/checkEmail';

const { signup } = UserController;
const { validateUserSignup } = UserValidation;
const user = express.Router();

// sign user up
user.post('/signup', checkUser, validateUserSignup, signup);

export default user;
