import express from 'express';
import user from './users';

const router = express.Router();

router.use(
  '/',
  user
);

export default router;
