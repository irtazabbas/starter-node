const config = require('config');
const jwt = require('jsonwebtoken');
const error = require('http-errors-promise');

const CON = require('../constants');

function extractPayload(user) {
  return {
    id: user.id
  };
};

module.exports = {
  signToken(user) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        extractPayload(user),
        CON.TOKEN_KEY,
        CON.TOKEN_OPTIONS,
        (err, token) => {
          if (err) reject(err);
          else resolve(token);
        }
      )
    });
  },

  signTokenSync(user) {
    return jwt.sign(
      extractPayload(user),
      CON.TOKEN_KEY,
      CON.TOKEN_OPTIONS
    );
  },

  verify(token) {
    if (!token) return Promise.reject('Token required to verify.');

    return new Promise((resolve, reject) => {
      jwt.verify(token, CON.TOKEN_KEY, (err, payload) => {
        if (err) reject(error(err, CON.ERROR.BAD_TOKEN, null, true));
        else resolve(payload);
      });
    });
  }
};
