
const Sequelize = require('sequelize');
const os = require('os');
const config = require('config');

const db = config.db;

const sequelize = new Sequelize(
  db.name,
  db.user,
  db.password,
  {
    host: db.host,
    port: db.port,
    dialect: 'postgres', // can be changed to the db of choice, supported by Sequelize
    pool: {
      max: connectionPoolSize(),
      acquire: 5000,
      min: 0
    },

    logging: config.sequelize.lgging
  },
);

sequelize.authenticate()
  .then(() => console.info(
    `[pid ${process.pid}] Successfully connected to db "${db.name}"`
  ))
  .catch(err => {
    console.error(
      `[pid ${process.pid}] Error connecting to db "${db.name}"`, err
    );
    process.exit(1);
  });


/**
 * Comes up with a pool size. This method should be tuned in order to update
 * connection pool size. Its based on this https://bit.ly/1fUY7dO
 */
function connectionPoolSize() {
  // A factor that's based on the type of storage.
  const MEM_FACTOR = 1;

  return (os.cpus().length * 2) + MEM_FACTOR;
}

module.exports = sequelize;
