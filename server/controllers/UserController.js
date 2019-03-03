import bcrypt from 'bcrypt';
import models from '../database/models';
import helpers from '../helpers';

const {
  sendMail,
  createToken,
  identifyUserById
} = helpers;
const {
  User,
  UserRole,
  Organization,
  OrganizationType,
  Follow
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
      /* istanbul ignore next */
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
      /* istanbul ignore next */
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
      /* istanbul ignore next */
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
    let compare;
    try {
      compare = await bcrypt.compare(receivedPassword, hashedPassword);
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
    if (!compare) {
      return res.status(400).json({
        status: 'failure',
        message: 'email/password do not match'
      });
    }
    return res.status(200).json({
      status: 'success',
      message: `${accountType} successfully logged in`,
      userData,
      token: createToken(id)
    });
  }

  /**
   * @description let a user select organization
    * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - next function
   * @returns {object} - returns null
  */
  static async followOrganization(req, res, next) {
    const {
      params: { organizationId }, userData: {
        accountType, id: userId, firstName, lastName
      }
    } = req;
    try {
      const organization = await identifyUserById(organizationId, next);
      if (typeof organization === 'object') {
        if (accountType === 'organization') {
          return res.status(400).json({
            status: 'failure', message: 'organizations can not follow organizations'
          });
        }
        const checkFollow = await Follow.find({ where: { userId, organizationId } });
        let response, statusCode;
        if (!checkFollow) {
          await Follow.create({ userId, organizationId });
          response = { status: 'success', message: 'organization followed successfully' };
          statusCode = 201;
          UserController.changeFollowerCount(Organization, organizationId, '+', 'followers');
          UserController.changeFollowerCount(User, userId, '+', 'follows');
          sendMail({
            to: organization.email,
            fullName: `${firstName} ${lastName}`,
            mailType: 'followers',
            organizationName: organization.name
          });
        } if (checkFollow) {
          response = { status: 'failure', message: 'you are already following this organization' };
          statusCode = 409;
        }
        return res.status(statusCode).json({ ...response });
      }
      return res.status(400).json({
        status: 'failure', message: 'the organization you are trying to follow does not exist'
      });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }

  /**
   * @description increase or decrease organization followers
   * @param {object} model - action type
   * @param {object} id - organization id
   * @param {object} action - action to perform
   * @param {object} attribute - action to perform
   * @returns {object} - returns null
  */
  static async changeFollowerCount(model, id, action, attribute) {
    if (action === '+') {
      await model.increment(attribute, { where: { id } });
    } else {
      await model.increment(attribute, { where: { id }, by: -1 });
    }
  }
}

export default UserController;
