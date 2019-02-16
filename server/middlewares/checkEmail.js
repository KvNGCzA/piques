import models from '../database/models';

const { User, Organization } = models;

export default async (req, res, next) => {
  const { email } = req.body;
  const userEmail = await User.find({ where: { email } });
  const organizationEmail = await Organization.find({ where: { email } });
  if (userEmail || organizationEmail) {
    return res.status(409).json({
      status: 'failure',
      message: 'An account with this email already exists'
    });
  }
  next();
};
