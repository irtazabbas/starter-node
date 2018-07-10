const crypto = require('crypto');

const CON = require('../constants');

module.exports = {
  generateSalt() {
    return crypto.randomBytes(CON.SALT_BYTES).toString('base64');
  },

  hashPassword(password, salt) {
    if (!password || !salt) {
      throw new Error('Password or salt not found.');
    }

    return crypto.pbkdf2Sync(
      password,
      new Buffer(salt, 'base64'),
      CON.HASH_ITERATIONS,
      CON.SALT_BYTES,
      CON.HASH_ALGO,
    ).toString('base64');
  }
}
