
const logger = require('morgan');

module.exports = {
  logger: logger('dev'),
  subdomainOffset: -1,
  devDefaultSubdomain: process.env.VC_DEV_DEFAULT_SUBDOMAIN ||
    'dev-default-subdomain',
  sequelize: {
    logging: true
  }
};
