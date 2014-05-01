/**
 * currentUser
 *
 * @module      :: Policy
 * @description :: Gets the currently logged in user
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.session.user) {
    if (req.body) req.body.user = req.session.user;
    if (req.query) req.query.user = req.session.user;

    next();
  } else {
    return res.json(403, { error: 'Not authorized' });
  }

};
