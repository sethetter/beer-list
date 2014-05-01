/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    beers: {
      collection: 'beer',
      via: 'user'
    }
  },

  beforeCreate: function(values, next) {
    bcrypt.hash(values.password, 10, function(err, hash) {
      if (err) return next(err);

      values.password = hash;
      return next();
    });
  }
};

