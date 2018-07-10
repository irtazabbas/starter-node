
module.exports = {
  forkChildren: false,
  subdomainOffset: process.env.VC_SUBDOMAIN_OFFSET || 4,
  db: {
    host: process.env.VC_DB_URL || 'localhost',
    port: process.env.VC_DB_PORT || 5432,
    name: process.env.VC_DB_NAME || 'starter_node',
    user: process.env.VC_DB_USER || 'user',
    password: process.env.VC_DB_PASSWORD || 'password',
  },
  sequelize: {
    // drops all tables and re-creates them, should be used very carefully
    force: process.env.VC_DB_FORCE_MODELS || false,
    logging: false,
  },
  bluebird: {
    warnings: false
  },
  tokenExpiry: 3600, // 1 hour
  errorLogLevel: 1
};
