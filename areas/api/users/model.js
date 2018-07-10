
const Sequelize = require('sequelize');
const config = require('config');

const CON = require('./constants');
const sequelize = require('../../../database');

const UserModel = sequelize.define(
  CON.MODEL,
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      get: getLowerCase('email'),
      set: setLowerCase('email'),
      validate: {
        is: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
      }
    },
    hashedPassword: {
      type: Sequelize.STRING,
      get: () => null
    },
    salt: {
      type: Sequelize.STRING,
      get: () => null
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      defaultValue: CON.STATUS.ACTIVE,
      values: Object.values(CON.STATUS)
    },
    provider: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: CON.PROVIDERS.LOCAL
    },
    resetPasswordToken: Sequelize.STRING,
    thirdPartyData: Sequelize.JSONB,
  },
  {
    validate: {
      requireSaltIfLocal: requiredIfProvider(
        'salt', CON.PROVIDERS.LOCAL
      ),
      requireHashIfLocal: requiredIfProvider(
        'hashedPassword', CON.PROVIDERS.LOCAL
      )
    }
  }
);

function getLowerCase(column) {
  return function() {
    return (this.getDataValue(column) || '').toLowerCase();
  }
}

function setLowerCase(column) {
  return function(value) {
    this.setDataValue(column, (value || '').toLowerCase())
  }
}

function requiredIfProvider(column, provider) {
  return function() {
    const value = this.getDataValue(column);
    if (this.getDataValue('provider') === CON.PROVIDERS[provider] && !value) {
      throw new Error(
        `"${column}" is required with provider "${CON.PROVIDERS[provider]}"`
      );
    }
  }
}

/** 
 * Attaching methods
 */
Object.assign(UserModel, require('./class-methods'));
Object.assign(UserModel.prototype, require('./instance-methods'));


module.exports = UserModel;
