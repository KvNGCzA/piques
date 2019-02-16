import models from '../database/models';

const {
  User,
  Organization,
  UserRole
} = models;

export const identifyUserById = async (id, res, next) => {
  let user, organization;
  try {
    user = await User.findByPk(id);
    organization = await Organization.findByPk(id);
  } catch (error) {
    next(error);
  }
  if (user) return { ...user.dataValues, accountType: 'user' };
  if (organization) return { ...organization.dataValues, accountType: 'organization' };
  return res.status(404).json({
    status: 'failure',
    message: 'user not found'
  });
};

export const identifyUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  let user, organization;
  try {
    user = await User.findOne({
      where: { email },
      include: [{
        model: UserRole,
        as: 'role',
        attributes: ['roleId']
      }]
    });
    organization = await Organization.findOne({
      where: { email }
    });
  } catch (error) {
    next(error);
  }
  let result;
  if (user) result = { ...user.dataValues, accountType: 'user' };
  if (organization) result = { ...organization.dataValues, accountType: 'organization' };
  if (!result) {
    return res.status(404).json({
      status: 'failure',
      message: 'user not found'
    });
  }
  req.userData = result;
  next();
};
