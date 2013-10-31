var mongo = require("mongodb");
var monk = require('monk');

var db = monk('localhost:' + mongo.Connection.DEFAULT_PORT + '/nodejs-consumption');

exports.index = function(req, res){
	var collection = db.get('consumptions');

	collection.find({},{},function(e, docs){
		var sumDistance = 0;
		var sumFuel = 0;

		if (docs && docs.length > 0) {
			for (var i = 0; i < docs.length; i++) {
				sumDistance += parseFloat(docs[i].km);
				sumFuel += parseFloat(docs[i].l);
			}
		}

		var average = 0;

		if (sumDistance !== 0 && sumFuel !== 0) {
			average = (sumFuel / sumDistance) * 100;

			// round to two decimal places
			average = Math.round(average * 100) / 100;
		}

		res.render('index', {
			title: 'Consumption app',
			consumptions: docs,
			average: average
		});
	});
};