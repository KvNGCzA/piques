
import models from '../database/models';

const { Type } = models;

export default async (req, res, next) => {
  const { type, signupType } = req.body;
  if (signupType === 'organization') {
    try {
      const types = await Type.find({ where: { name: type } });
      if (types) {
        req.typeId = types.id;
        return next();
      }
      return res.status(422).json({
        errors: {
          type: ['please select a valid organization type']
        }
      });
    } catch (error) {
      /* istanbul ignore next */
      next(error);
    }
  }
  return next();
};
