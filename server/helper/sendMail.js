import sgMail from '@sendgrid/mail';
import mail from './mails';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default (obj) => {
  const msg = mail(obj);
  return sgMail.send(msg);
};
