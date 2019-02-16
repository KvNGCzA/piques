const message = [];

/**
* @description - This function sends the error in the suggested json format.
* @param {object} req - The request object to be validated.
* @param {object} res - Th response object.
* @param {object} next - The callback function to the next middleware.
* @param {number} statusCode - the status code for the error
* @returns {object} - The error object with message.
* @memberOf UserValidation
* @static
*/
export default (req, res, next, statusCode) => {
  const newErrors = req.validationErrors();
  const errors = {};
  if (newErrors) {
    newErrors.forEach((x) => {
      errors[`${x.param}`] = [];
    });
    newErrors.forEach((err) => {
      if (
        errors[`${err.param}`]
        && errors[`${err.param}`].indexOf(err.msg) === -1
      ) {
        errors[`${err.param}`].push(err.msg);
      }
    });
  }
  if (newErrors || message.length) {
    return res.status(statusCode || 422).json({ errors });
  }
  if (!newErrors && !message.length) return next();
};
