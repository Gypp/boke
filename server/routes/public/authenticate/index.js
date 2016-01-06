module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/

    var User        = require('../../../models/user');
    var config      = require('../../../config');
    var jwt         = require('jsonwebtoken');

    app.post('/authenticate', function(req, res) {
      User.model.findOne({
        name: req.body.name
      }, function(err, user) {

        if (err) throw err;

        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            var token = jwt.sign({id: user._id, name: user.name}, config.secret, { expiresIn: 60 * 60 * 24});

            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }

        }

      });
    });

};
