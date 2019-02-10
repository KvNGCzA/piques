import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../database/models';

const { User } = models;

/**
 * @class UserController
 * @description User related Operations
*/
class UserController {
  /**
   * @description
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next function
   * @returns {object} - returns user
  */
  static async signup(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {
      // create user
      const result = await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword
      });
      // get user id
      const { id } = result.dataValues;
      // create jwt token
      const token = jwt.sign({ id }, process.env.JWT_SECRET);
      // return status and success message
      res.status(201).json({
        status: 'success',
        message: 'user successfully created',
        token
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
