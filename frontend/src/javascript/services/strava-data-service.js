import http from 'http';

export class DataService {

	constructor() {}

	getAthlete(cb) {
  let options = {
    headers: {'Content-Type': 'application/json'},
    path: '/athlete',
  };

  let data = '';
  http.get(options, function(res) {
    res.on('data', function(buf) {
      data += buf;
    });

    res.on('end', function() {
      if (data && data.length) {
        data = JSON.parse(data);
      }
      cb(null, data);
    });
    res.on('error', function(err) {
      cb(err);
    });
  });
	}
    getActivity(id, cb) {
      let data = '';
      http.get('http://localhost:3000/activity/' + id, function(res) {
        res.on('data', function(buf) {
          data += buf;
        });

        res.on('end', function() {
          cb(null,JSON.parse(data));
        });
        res.on('error', function(err) {
          cb(err);
        });

      });
    }
	getActivities(page, cb) {
  console.log('getActivities(cb)', page)
  page = page ? page : 1;

  let data = '';
  http.get('http://localhost:3000/activities?page=' + page, function(res) {
    res.on('data', function(buf) {
      data += buf;
    });

    res.on('end', function() {
      cb(null, JSON.parse(data)); 
    });
    res.on('error', function(err) {
      cb(err);
    });
  });
	}
}
