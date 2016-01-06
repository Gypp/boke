module.exports.set = function (app) {
    "use strict";
    /*jslint unparam: true*/
    var fs = require('fs');

    app.get('/biography', function (req, res) {
        fs.readFile('./data/biography.html', 'utf-8', function(err, data){
          var result = {
            html: data
          };

          fs.readFile('./data/biography.md', 'utf-8', function(err, data){
            if (err) {
              result.markdown = ""
            }else {
              result.markdown = data;
            }
            res.send(JSON.stringify(result));
          });
        });
    });

};
