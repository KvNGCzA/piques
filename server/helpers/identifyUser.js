import models from '../database/models';
import extractId from './extractId';

const {
  User,
  Organization,
  UserRole,
  Follow
} = models;

const userQuery = {
  include: [{
    model: UserRole,
    as: 'role',
    attributes: ['roleId']
  },
  {
    model: Follow,
    attributes: ['organizationId'],
    as: 'following',
    include: [{
      model: Organization,
      attributes: ['id', 'name', 'address', 'country'],
    }]
  }]
};

const extractUserInfo = user => ({
  ...user.dataValues,
  role: extractId('roleId', user.role),
  following: extractId('Organization', user.following),
  accountType: 'user'
});

export const identifyUserById = async (id, next) => {
  let user, organization;
  try {
    user = await User.findByPk(id, { ...userQuery });
    organization = await Organization.findByPk(id);
  } catch (error) {
    next(error);
  }
  if (user) return extractUserInfo(user);
  if (organization) return { ...organization.dataValues, accountType: 'organization' };
};

export const identifyUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  let user, organization;
  try {
    user = await User.findOne({ where: { email }, ...userQuery });
    organization = await Organization.findOne({
      where: { email }
    });
  } catch (error) {
    /* istanbul ignore next */
    next(error);
  }
  let result;
  if (user) result = extractUserInfo(user);
  if (organization) result = { ...organization.dataValues, accountType: 'organization' };
  if (!result) {
    return res.status(404).json({
      status: 'failure',
      message: 'account not found'
    });
  }
  req.userData = result;
  next();
};
