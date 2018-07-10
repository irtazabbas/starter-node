

const mainRouter = require('express').Router();

const API = require('./api');


module.exports = function(app) {
  // Applying platform swtich MW
  // app.use(PlatformMW.switch);
  // ===========================

  // Stitching in the API routes
  Object.values(API).forEach(entity => {
    entity.router(mainRouter);
  });
  app.use(mainRouter);
  // ========================
};
