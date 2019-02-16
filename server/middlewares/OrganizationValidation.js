import helpers from '../helpers';
import UserValidation from './UserValidation';

const { formattedError } = helpers;
const { validateEmail, validatePassword } = UserValidation;
/**
 * @class OrganizationValidation
 * @description Helps perform validations on organizatino request body.
 */
class OrganizationValidation {
  /**
    * @description - This method validates organization name
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf OrganizationValidation
    * @static
  */
  static validateName(req) {
    req.checkBody('name', 'please enter a name for your organization')
      .exists().notEmpty();
    if (req.body.name) {
      req.checkBody('name', 'please enter a valid name for your organization')
        .custom((name) => {
          if (/^[a-zA-Z ]*$/.test(name)) return true;
          return false;
        });
    }
  }

  /**
    * @description - This method validates organization type
    * @param {object} req - The request object
    * @param {object} next - The next function
    * @returns {null} - returns nothing
    * @memberOf OrganizationValidation
    * @static
  */
  static validateType(req) {
    req.checkBody('type', 'please select an organization type')
      .exists().notEmpty();
    if (req.body.type) {
      req.checkBody('type', 'please select a valid organization type')
        .custom((type) => {
          if (/^[a-zA-Z ]*$/.test(type)) return true;
          return false;
        });
    }
  }

  /**
    * @description - This method validates country
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf OrganizationValidation
    * @static
  */
  static validateCountry(req) {
    req.checkBody('country', 'please select a country')
      .exists().notEmpty();
    if (req.body.name) {
      req.checkBody('country', 'please select a valid country')
        .custom((country) => {
          if (/^[a-zA-Z ]*$/.test(country)) return true;
          return false;
        });
    }
  }

  /**
    * @description - This method validates address
    * @param {object} req - The request object
    * @returns {null} - returns nothing
    * @memberOf OrganizationValidation
    * @static
  */
  static validateAddress(req) {
    req.checkBody('address', 'please enter an address')
      .exists().notEmpty();
    if (req.body.name) {
      req.checkBody('address', 'please enter a valid address')
        .custom((address) => {
          if (address.trim().length < 15) return false;
          return true;
        });
    }
  }


  /**
    * @description - This method validates the organization signup
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @param {object} next - The next function
    * @returns {null} - returns nothing
    * @memberOf OrganizationValidation
    * @static
  */
  static validateOrganizationSignup(req, res, next) {
    validateEmail(req);
    validatePassword(req);
    OrganizationValidation.validateName(req);
    OrganizationValidation.validateType(req, next);
    OrganizationValidation.validateCountry(req);
    OrganizationValidation.validateAddress(req);
    formattedError(req, res, next);
  }
}

export default OrganizationValidation;
