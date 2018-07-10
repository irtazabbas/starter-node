
const error = require('http-errors-promise');

const authHelpers = require('../../authorization/helpers/crypto');


module.exports = {
  checkPassword(password) {
    if (!password) throw new Error('Password required.');

    const salt = this.getDataValue('salt'),
          hash = this.getDataValue('hashedPassword');

    return authHelpers.hashPassword(password, salt) === hash ?
      Promise.resolve() : Promise.reject();
  }
};
