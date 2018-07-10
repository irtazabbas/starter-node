const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const error = require('http-errors-promise');

// full relative path to user model instead of require('../../api').users.model to avoid circular reference
const UserModel = require('../../api/users/model');
const tokenMethods = require('../helpers/token');
const CON = require('../constants')

passport.use(new BearerStrategy(
  function(token, done) {
    tokenMethods.verify(token)
      .then(payload => {
        UserModel.findById(payload.id)
        .then(user => {
          if (!user) {
            console.error(`[Auth] user not found '${payload.id}'`);
            done(true);
          } else {
            done(null, user);
          }
        })
        .catch(err => done(error(err, CON.ERROR.AUTH_ERRED, null, true)));
      })
      .catch(err => done(err))
  }
));
