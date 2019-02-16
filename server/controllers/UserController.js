import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import models from '../database/models';

const {
  User,
  UserRole,
  Organization,
  OrganizationType
} = models;

/**
 * @class UserController
 * @description User related operations
*/
class UserController {
  /**
   * @description sign a user or organization up
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next function
   * @returns {object} - returns user
  */
  static signup(req, res, next) {
    const { signupType } = req.body;
    if (signupType === 'user') {
      // sign user up
      return UserController.signupUser({ ...req.body, res, next });
    }
    // sign organization up
    UserController.signupOrganization({
      ...req.body,
      typeId: req.typeId,
      res,
      next
    });
  }

  /**
   * @description sign a user up
   * @param {object} obj - user object
   * @returns {object} - returns null
  */
  static async signupUser(obj) {
    const {
      firstName, lastName, email,
      password, res, next
    } = obj;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
      // create user
      const addUser = await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword
      });
      // get user id
      const { id } = addUser.dataValues;
      // add user to UserRoles table
      await UserRole.create({
        userId: id,
        roleId: 98536
      });
      // create jwt token
      const token = jwt.sign({ id }, process.env.JWT_SECRET);
      // return status and success message
      return res.status(201).json({
        status: 'success',
        message: 'user successfully created',
        token
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description sign an organization up
   * @param {object} obj - user object
   * @returns {object} - returns null
  */
  static async signupOrganization(obj) {
    const {
      name, email, password,
      address, country, next,
      res, typeId
    } = obj;
    const encryptedPassword = bcrypt.hashSync(password, 10);
    try {
      // create organization
      const { id: organizationId } = await Organization.create({
        name,
        email,
        password: encryptedPassword,
        address,
        country,
      });
      // insert organization into OrganizationType table
      await OrganizationType.create({
        organizationId,
        typeId
      });
      // create jwt token
      const token = jwt.sign({ id: organizationId }, process.env.JWT_SECRET);
      // return status and success message
      return res.status(201).json({
        status: 'success',
        message: 'organization successfully created',
        token
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
