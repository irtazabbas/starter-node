
require('./strategies');

module.exports = {
  ...{
    ...require('./helpers/token'),
    ...require('./helpers/crypto')
  },
  MW: {
    bearer: require('./middlewares/bearer')
  }
};
