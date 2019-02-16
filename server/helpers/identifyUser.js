import models from '../database/models';

const { User, Organization } = models;

export default async (id, res, next) => {
  let user, organization;
  try {
    user = await User.findByPk(id);
    organization = await Organization.findByPk(id);
  } catch (error) {
    next(error);
  }
  if (user) return { ...user.dataValues, accountType: 'user' };
  if (organization) return { ...organization.dataValues, accountType: 'organization' };
  return res.status(400).json({
    status: 'failure',
    message: 'user does not exist'
  });
};
