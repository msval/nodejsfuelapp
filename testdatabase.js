var mongo = require("mongodb");

var dbHost = "127.0.0.1";
var dbPort = mongo.Connection.DEFAULT_PORT;

var db = new mongo.Db("nodejs-consumption", new mongo.Server(dbHost, dbPort), {safe: true});

db.open(function (error) {
	console.log("We are connected " + dbHost + ":" + dbPort);

	db.collection("consumptions", function (error, collection) {
		console.log("consumptions collection created");

		collection.insert({
			km: 980,
			l: 48,
			d: "10.11.2013"
		}, function () {
			console.log("success insert ");
		});
	});
});