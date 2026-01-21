const AppError = require("../utils/appError");

module.exports = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      return next(
        new AppError(err.errors.join(" | "), 400)
      );
    }
  };
