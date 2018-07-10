/**
 * @fileOverview Exports all API entities' (modules/resources) model and router
 */

const sequelize = require('../../database');
const config = require('config');

const entities = {};

[
  'users'
].forEach(e => {
  entities[e] = {
    model: require(`./${e}/model`),
    router: require(`./${e}/routes`)
  }
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
