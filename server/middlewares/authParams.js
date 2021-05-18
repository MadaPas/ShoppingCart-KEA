/* eslint-disable consistent-return */
const verifyIdParam = (req, res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json('Wrong Brand id format. Try again.');
  }
  next();
};

const authParams = {
  verifyIdParam,
};

module.exports = authParams;
