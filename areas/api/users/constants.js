const error = require('http-errors-promise');
const httpError = error.httpError;

const CONSTANTS = {
  MODEL: 'Users',
  PATH: '/users',
  STATUS: {
    ACTIVE: 'ACTIVE',
    DEACTIVE: 'DEACTIVE',
    DELETED: 'DELETED'
  },
  PROVIDERS: {
    LOCAL: 'LOCAL',
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
    ADFS: 'ADFS',
    OKTA: 'OKTA'
  }
};

const ERRORS = {
  ...error.makeCommonErrors(CONSTANTS.MODEL),
  LOGIN_ERRED: httpError(500, 'Error logging in.'),
  INVALID_CREDENTIALS: httpError(401, 'Invalid email or password.')
};


module.exports = Object.freeze({
  ...CONSTANTS,
  ERRORS
});
