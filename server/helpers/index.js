import formattedError from './formattedError';
import { identifyUserById, identifyUserByEmail } from './identifyUser';
import mails from './mails';
import sendMail from './sendMail';
import createToken from './createToken';
import extractId from './extractId';

export default {
  formattedError,
  identifyUserById,
  identifyUserByEmail,
  mails,
  sendMail,
  createToken,
  extractId
};
