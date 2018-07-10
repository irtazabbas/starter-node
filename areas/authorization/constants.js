
const config = require('config');
const httpError = require('http-errors-promise').httpError;

module.exports = Object.freeze({
  TOKEN_KEY: 'idWKE!2keySECRE&7oken',
  TOKEN_OPTIONS: {
    expiresIn: config.tokenExpiry
  },
  // Number of random bytes '64' is based on the hashing algorithm used which
  // is sha512 ~ 64 bytes 
  SALT_BYTES: 64,
  HASH_ALGO: 'sha512',
  HASH_ITERATIONS: 10000,

  ERROR: {
    BAD_TOKEN: httpError(400, 'Bad auth token.'),
    AUTH_ERRED: httpError(500, 'Error while authorizing bearer.')
  }
});
