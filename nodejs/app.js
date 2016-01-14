var express = require('express');
var app = express();
var strava = require('strava-v3');
var async = require('async');

var PAGE_SIZE = 10;

app.use(express.static(__dirname + '/public', {
  'index': 'index.html'
}));

app.get('/athlete', function(req, res) {
  async.parallel([
  function(cb) {strava.athlete.get({}, cb);},
		function(cb) {strava.athlete.listActivities({
  'page': 1,
  'per_page': PAGE_SIZE
		}, cb);}],
	function(err, data) {
  console.log(data);
  res.send({athlete: data[0], activities: data[1]});
	 	});
});

app.get('/activity/:id', function(req, res) {
  strava.activities.get({id: req.params.id}, function(err, payload) {
    console.log(err, payload);
    res.send(payload);
  });
});

app.get('/activities', function(req, res) {
	var opts = {
		page : 1,
		'per_page': PAGE_SIZE
	};

	if(req.query.page){
		opts.page = parseInt(req.query.page);
	}
  strava.athlete.listActivities(opts, function(err, payload) {
    console.log(err, payload);
    res.send(payload);
  });
});

app.listen(process.env.VCAP_APP_PORT || 3000);
console.log('listening on port ', process.env.VCAP_APP_PORT || 3000);
