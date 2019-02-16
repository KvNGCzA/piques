import jwt from 'jsonwebtoken';

export default (id, expiresIn) => {
  if (expiresIn) return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
