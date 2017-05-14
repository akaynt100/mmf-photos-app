const asyncMiddleware = handler => (req, res, next) => {
  Promise.resolve(handler(req, res)).then(() => {
    next();
  }, err => {
    next(err);
  });
};

export default asyncMiddleware;
