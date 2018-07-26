/**
 * @fileOverview Exports all API entities' (modules/resources) model and router
 */

const sequelize = require('../database');
const config = require('config');

const entities = {};

[
  'users'
].forEach(e => {
  let model, router;
  try {
    model = require(`./${e}/model`);
  } catch (err) {
    console.error(`Error including ${e} model`);
    throw err;
  }

  try {
    router = require(`./${e}/routes`);
  } catch (err) {
    // ignoring if router does not exist
    if (err.code !== 'MODULE_NOT_FOUND') console.log(err);
  }

  entities[e] = { model, router };
});

/**
 * Syncing all models onece they're defined
 */
sequelize.sync({force: config.sequelize.force})
  .then(() => {
    console.green(`Models synced (forced: ${config.sequelize.force})...`);
    // TODO: Remove once seeding is in place (Use this first time to create platform)
    // entities.platforms.model.create({
    //   name: 'dev default',
    //   subdomain: 'dev-default-subdomain'
    // })
  })
  .catch(err => {
    console.error(
      `Error syncing Models (forced: ${config.sequelize.force})`,
      err
    );
  });


module.exports = Object.freeze(entities);
