import models from '../database/models';

const { User } = models;

export default async (req, res, next) => {
  const { email } = req.body;
  const result = await User.find({ where: { email } });
  if (result) {
    return res.status(409).json({
      status: 'failure', message: 'user already exists'
    });
  }
  next();
};
