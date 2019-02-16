import UserValidation from './UserValidation';
import OrganizationValidation from './OrganizationValidation';

const { validateUserSignup } = UserValidation;
const { validateOrganizationSignup } = OrganizationValidation;

export default (req, res, next) => {
  const { signupType } = req.body;
  if (signupType === 'user') return validateUserSignup(req, res, next);
  return validateOrganizationSignup(req, res, next);
};
