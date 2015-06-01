/**
 * Created by tom on 29-5-15.
 */
var mongoose = require('mongoose')
    , User = mongoose.model('User');


exports.retrieveAll = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }

        res.json(users);
    });
};


exports.retrieveOne = function (request, response) {
    User
        .find()
        .exec(function(err, data) {
            if (err) throw err;
            response.json(data);
        });
};

exports.createOne = function (req, res) {
    var user = new User(req.body);
    console.log(req.body);

    user.save(function (err) {
        if (err) {
            return res.send(err);
        }

        res.send({
            result: {
                code: 0,
                message: 'user added!'
            }
        });
    });
};

