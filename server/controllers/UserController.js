import bcrypt from 'bcrypt';
import models from '../database/models';
import helpers from '../helpers';

const { sendMail, createToken, extractId } = helpers;
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
      firstName, lastName, email, password, res, next
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
      const token = createToken(id, '24h');
      // send mail
      sendMail({
        to: email,
        fullName: `${firstName} ${lastName}`,
        mailType: 'verify signup',
        token
      });
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
      name, email, password, address, country, next, res, typeId
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
      const token = createToken(organizationId, '24h');
      // send mail
      sendMail({
        to: email,
        fullName: `${name}`,
        mailType: 'verify signup',
        token
      });
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

  /**
   * @description verify a user
    * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next function
   * @returns {object} - returns null
  */
  static async verifyUser(req, res, next) {
    const {
      id, accountType, verified,
      email, name, firstName, lastName
    } = req.userData;
    if (verified) {
      return res.status(200).json({
        status: 'failure',
        message: `${accountType} is already verified`
      });
    }
    const verifiedData = { verified: true };
    try {
      if (accountType === 'organization') {
        await Organization.update(verifiedData, {
          where: { id }
        });
        sendMail({ to: email, fullName: `${name}`, mailType: 'welcome' });
      }
      if (accountType === 'user') {
        await User.update(verifiedData, {
          where: { id }
        });
        sendMail({ to: email, fullName: `${firstName} ${lastName}`, mailType: 'welcome' });
      }
      return res.status(200).json({
        status: 'success',
        message: `${accountType} verified successfully`
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @description log a user or organization in
    * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next function
   * @returns {object} - returns null
  */
  static async login(req, res, next) {
    const { password: receivedPassword } = req.body;
    const {
      id, password: hashedPassword, verified, accountType
    } = req.userData;
    const { userData } = req;
    if (!verified) {
      return res.status(400).json({
        status: 'failure',
        message: 'please verify your email'
      });
    }
    delete userData.updatedAt;
    delete userData.createdAt;
    delete userData.password;
    let compare, role, data = userData;
    try {
      compare = await bcrypt.compare(receivedPassword, hashedPassword);
    } catch (error) {
      next(error);
    }
    if (!compare) {
      return res.status(400).json({
        status: 'failure',
        message: 'email/password do not match'
      });
    } if (accountType === 'user') {
      role = extractId('roleId', userData.role);
      data = { ...userData, role };
    }
    return res.status(200).json({
      status: 'success',
      message: `${accountType} successfully logged in`,
      userData: { ...data },
      token: createToken(id)
    });
  }
}

export default UserController;
