import helpers from '../helpers';

const { formattedError } = helpers;

/**
 * @class UserValidation
 * @description Helps perform validations on user request body.
 */
class UserValidation {
  /**
    * @description - This method validates emails
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validateEmail(req) {
    req.checkBody('email', 'please enter email')
      .exists().notEmpty();
    if (req.body.email) {
      req.checkBody('email', 'please enter a valid email').isEmail();
    }
  }

  /**
    * @description - This method validates signup type
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validateSignupType(req) {
    req.checkBody('signupType', 'please enter a signup type')
      .exists().notEmpty();
    if (req.body.signupType) {
      req.checkBody('signupType', 'please enter a valid signup type')
        .custom((signupType) => {
          const signupTypes = ['user', 'organization'];
          if (signupTypes.indexOf(signupType) !== -1) return true;
          return false;
        });
    }
  }

  /**
    * @description - This method validates first and last names
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validateName(req) {
    req.checkBody('firstName', 'please enter your first name')
      .exists().notEmpty();
    if (req.body.firstName) {
      req.checkBody('firstName', 'please enter a valid first name')
        .custom((firstName) => {
          if (/^[a-zA-Z ]*$/.test(firstName)) return true;
          return false;
        });
    }
    req.checkBody('lastName', 'please enter your last name')
      .exists().notEmpty();
    if (req.body.lastName) {
      req.checkBody('lastName', 'please enter a valid last name')
        .custom((lastName) => {
          if (/^[a-zA-Z ]*$/.test(lastName)) return true;
          return false;
        });
    }
  }

  /**
    * @description - This method validates passwords
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validatePassword(req) {
    req.checkBody('password', 'please enter a password')
      .exists().notEmpty();
    if (req.body.password) {
      req.checkBody('password', 'password must be more than 7 characters')
        .isLength({ min: 8 });
    }
  }

  /**
    * @description - This method validates the user signup
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {object} next - The next function
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static signupTypeValidator(req, res, next) {
    UserValidation.validateSignupType(req);
    formattedError(req, res, next);
  }

  /**
    * @description - This method validates the user signup
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {object} next - The next function
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validateUserSignup(req, res, next) {
    UserValidation.validateEmail(req);
    UserValidation.validateName(req);
    UserValidation.validatePassword(req);
    formattedError(req, res, next);
  }

  /**
    * @description - This method validates the user login
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {object} next - The next function
    * @returns {null} - returns nothing
    * @memberOf UserValidation
    * @static
  */
  static validateUserLogin(req, res, next) {
    UserValidation.validateEmail(req);
    UserValidation.validatePassword(req);
    formattedError(req, res, next);
  }
}

export default UserValidation;
