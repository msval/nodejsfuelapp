var mongo = require("mongodb");
var monk = require('monk');

var db = monk('localhost:' + mongo.Connection.DEFAULT_PORT + '/nodejs-consumption');

exports.register = function (callback) {
	return function (req, resp) {

		// Get our form values. These rely on the "name" attributes
        var km = req.body.km;
        var l = req.body.l;
        var d = req.body.d;

        // Set our collection
        var collection = db.get('consumptions');

        // Submit to the DB
        collection.insert({
            "km" : km,
            "l" : l,
            "d" : d
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                console.log("There was a problem adding the information to the database.");
            }
            
        });

		return callback(req, resp);
	};
};