import models from '../database/models';

const { Type } = models;

export default async (req, res, next) => {
  const { type } = req.body;
  try {
    const result = await Type.find({
      name: type
    });
    if (!result) {
      return res.status(400)
        .json({
          status: 'failure',
          message: 'this organization type is not supported'
        });
    }
    const { id } = result.dataValues;
    req.typeId = id;
    next();
  } catch (error) {
    next(error);
  }
};
