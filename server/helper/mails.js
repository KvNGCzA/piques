/* eslint-disable max-len */
export default (obj) => {
  const {
    to, fullName, mailType, token
  } = obj;
  switch (mailType) {
    case 'verify signup':
      return {
        to,
        from: 'PiQues<no-reply@piques.com>',
        subject: `Welcome to PiQues ${fullName}! Confirm Your Email`,
        html: `<b>Dear ${fullName}</b>,
            <br><br><br>
            Verify your email by clicking on the link below
            <br><br><br>
            <a href="${process.env.BASE_URL}/users/verify?token=${token}">Click Me</a>
          `
      };
    default:
      break;
  }
};

/*
msg = {
  to: 'test@example.com',
  from: 'test@example.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
*/
