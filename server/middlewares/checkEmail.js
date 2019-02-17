import { Op } from 'sequelize';
import models from '../database/models';

const { User, Organization } = models;

export default async (req, res, next) => {
  const { email, name, signupType } = req.body;
  const userEmail = await User.findOne({ where: { email } });
  const organizationEmail = await Organization.findOne({
    where: {
      [Op.or]: [{ email }, { name }]
    },
  });
  if (userEmail || organizationEmail) {
    return res.status(409).json({
      status: 'failure',
      message:
        `${signupType === 'user' ? 'a user' : 'an organization'} with this ${
          organizationEmail
          && organizationEmail.name === name
          && signupType === 'organization' ? 'name' : 'email'
        } already exists`
    });
  }
  next();
};
