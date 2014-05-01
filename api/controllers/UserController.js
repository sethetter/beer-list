/**
 * UserController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
	
  login: function(req, res) {
    User.findOneByUsername(req.body.username, function(err, user) {
      if (err) return res.json({ error: 'Error finding user' });

      if (!user) return res.json({ error: 'User not found' });

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (err) return res.json(err);

        if (match) {
          req.session.user = user.id;
          res.json(200, { message: 'Logged in' });
        } else {
          res.json(403, { error: 'Invalid password' });
        }
      });
    })
  }

};
