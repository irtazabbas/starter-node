
const error = require('http-errors-promise');
const crypto = require('crypto');

// full relative path to authorization helper methods to avoid circular reference
const authHelpers = require('../../../authorization/helpers/crypto');
const authTokenHelpers = require('../../../authorization/helpers/token');
const check = require('../../../services/validation');
const CON = require('../constants');
const ERR = CON.ERRORS;

module.exports = {
  signup(params) {
    let result = check(params, ['email', 'name', 'password']);
    if (!result.status) return error(null, result.msg, 400);

    try {
      let user = new this(params);
      user.salt = authHelpers.generateSalt();
      user.hashedPassword = authHelpers.hashPassword(
        params.password,
        user.getDataValue('salt')
      );
  
      return user.save()
        .catch(err => error(err, ERR.CREATE_ERRED))
    } catch (exc) {
      return error(exc, ERR.CREATE_ERRED);
    }
  },

  login(params) {
    let vr = check(params, ['email', 'password']);
    if (!vr.status) return error(null, vr.msg, 400);

    return this.findOne({
      where: { email: params.email }
    })
      .then(user => {
        if (!user) return error(null, ERR.INVALID_CREDENTIALS);

        return user.checkPassword(params.password)
          .then(() => ({
            token: authTokenHelpers.signTokenSync(user),
            user
          }))
          .catch(err => error(err, ERR.INVALID_CREDENTIALS));
      });
  }
};
