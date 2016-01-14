(function (page,_,React,http,moment) {
  'use strict';

  page = 'default' in page ? page['default'] : page;
  var ___default = 'default' in _ ? _['default'] : _;
  React = 'default' in React ? React['default'] : React;
  http = 'default' in http ? http['default'] : http;
  moment = 'default' in moment ? moment['default'] : moment;

  var babelHelpers_classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var babelHelpers_createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var babelHelpers_inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var babelHelpers_possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*
   *	Basic dispatcher implementation
   *  Would be nice to use reflux instead...
   */
  var Dispatcher = function () {
  	function Dispatcher() {
  		babelHelpers_classCallCheck(this, Dispatcher);

  		this.handlers = {};
  	}

  	babelHelpers_createClass(Dispatcher, [{
  		key: "on",
  		value: function on(type, fn) {
  			if (!this.handlers) {
  				this.handlers = {};
  			}
  			if (!this.handlers[type] || !Array.isArray(this.handlers[type])) {
  				this.handlers[type] = [];
  			}
  			this.handlers[type].push(fn);
  			return this;
  		}
  	}, {
  		key: "off",
  		value: function off(type, fn) {
  			if (!Array.isArray(this.handlers[type])) {
  				return;
  			}
  			this.handlers.type = this.handlers[type].filter(function (item) {
  				if (item !== fn) {
  					return item;
  				}
  			});
  			return this;
  		}
  	}, {
  		key: "trigger",
  		value: function trigger(type, payload) {
  			if (this.handlers && this.handlers[type] && Array.isArray(this.handlers[type])) {

  				this.handlers[type].forEach(function (listener) {
  					listener.call(this, payload);
  				});
  			}
  			return this;
  		}
  	}]);
  	return Dispatcher;
  }();

  var Athlete = function (_Dispatcher) {
  	babelHelpers_inherits(Athlete, _Dispatcher);

  	function Athlete(dataService) {
  		babelHelpers_classCallCheck(this, Athlete);

  		var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(Athlete).call(this));

  		_this.data = {
  			activities: [],
  			activitiesPage: 1
  		};
  		_this.dataService = dataService;
  		_this.dataService.getAthlete(function (err, data) {
  			if (data) {
  				_this.data = data;
  				_this.setActivity(data.activities[0]);
  				_this.trigger('update', data);
  			}
  		});
  		return _this;
  	}

  	babelHelpers_createClass(Athlete, [{
  		key: 'getActivity',
  		value: function getActivity(id, cb) {
  			var res = _._.find(this.data.activities, { 'id': parseInt(id) });
  			cb(null, res);
  		}
  	}, {
  		key: 'setActivity',
  		value: function setActivity(activity) {
  			this.activity = activity;
  			this.trigger(this.SELECTED_ACTIVITY_CHANGE, activity);
  		}
  	}, {
  		key: 'getActivities',
  		value: function getActivities(cb) {
  			var self = this;
  			console.log(this.data);
  			this.data.activitiesPage = this.data.activitiesPage ? this.data.activitiesPage + 1 : 2;
  			this.dataService.getActivities(this.data.activitiesPage, function (err, data) {
  				self.data.activities = self.data.activities.concat(data);
  				self.trigger('activities-update', self.data);
  				cb(self.data);
  			});
  		}
  	}]);
  	return Athlete;
  }(Dispatcher);

  var ActivityController = function () {
  	function ActivityController(view, dataSource) {
  		babelHelpers_classCallCheck(this, ActivityController);

  		this.dataSource = dataSource;
  		this.dataSource.on(dataSource.SELECTED_ACTIVITY_CHANGE, this.onActivityChange.bind(this));
  		this.view = view;
  	}

  	babelHelpers_createClass(ActivityController, [{
  		key: 'show',
  		value: function show() {
  			console.log(arguments);
  		}
  	}, {
  		key: 'onActivityChange',
  		value: function onActivityChange(data) {
  			this.view.render(data);
  		}
  	}]);
  	return ActivityController;
  }();

  function ActivityViewRt () {
      return React.createElement('div', {}, React.createElement('h2', {}, this.state.data.name), React.createElement('div', { 'className': 'well' }, React.createElement('span', {}, 'Time : ', moment.utc(this.state.data.moving_time * 1000).format('HH:mm:ss')), React.createElement('br', {}), React.createElement('span', {}, 'Distance ', (this.state.data.distance / 1000).toFixed(2), ' km'), React.createElement('br', {}), React.createElement('span', {}, 'Average heartrate : ', this.state.data.average_heartrate), React.createElement('br', {}), React.createElement('span', {}, 'Max heartrate : ', this.state.data.max_heartrate), React.createElement('br', {}), React.createElement('span', {}, 'Average cadence : ', this.state.data.average_cadence), React.createElement('br', {}), React.createElement('span', {}, 'Average speed : ', (this.state.data.average_speed * 3.6).toFixed(2), ' km/h'), React.createElement('br', {}), React.createElement('span', {}, 'Max speed : ', (this.state.data.max_speed * 3.6).toFixed(2), ' km/h'), React.createElement('br', {})));
  };

  /**
   * facade and scaffolding for the react view.
   *
   * events-view.rt = generated file from the react templates in the view folder.
   */

  var ActivityView = function () {
  	function ActivityView() {
  		babelHelpers_classCallCheck(this, ActivityView);

  		this.ReactViewClass = React.createClass({

  			getInitialState: function getInitialState() {
  				return {
  					data: {}
  				};
  			},
  			render: function render() {
  				return ActivityViewRt.apply(this);
  			}

  		});
  		this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activity'));
  	}

  	babelHelpers_createClass(ActivityView, [{
  		key: 'render',
  		value: function render(data) {
  			console.log(data);

  			//	this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activity'));
  			this.ReactView.replaceState({ data: data });
  		}
  	}]);
  	return ActivityView;
  }();

  function onClick1() {
      this.sort('moving_time');
  }
  function onClick2() {
      this.sort('distance');
  }
  function onClick3() {
      this.sort('average_speed');
  }
  function onClick4() {
      this.sort('average_heartrate');
  }
  function onClick5(activity, activityIndex) {
      this.onClick(activity);
  }
  function repeatActivity6(activity, activityIndex) {
      return React.createElement('tr', {
          'key': activity.id,
          'onClick': onClick5.bind(this, activity, activityIndex)
      }, React.createElement('td', {}, React.createElement('a', { 'href': '/activity/' + activity.id + '/view' }, activity.name)), React.createElement('td', {}, moment.utc(activity.moving_time * 1000).format('HH:mm:ss')), React.createElement('td', {}, (activity.distance / 1000).toFixed(2), ' km'), React.createElement('td', {}, (activity.average_speed * 3.6).toFixed(2), ' km/h'), React.createElement('td', {}, activity.average_heartrate));
  }
  function onClick7() {
      this.onMoreClick();
  }
  function ActivitiesViewRt () {
      return React.createElement('div', {}, React.createElement('table', { 'className': 'table table-striped table-hover' }, React.createElement('caption', {}, 'Activities'), React.createElement('thead', {}, React.createElement('th', {}), React.createElement('th', { 'onClick': onClick1.bind(this) }, 'moving time'), React.createElement('th', { 'onClick': onClick2.bind(this) }, 'distance'), React.createElement('th', { 'onClick': onClick3.bind(this) }, 'avg speed'), React.createElement('th', { 'onClick': onClick4.bind(this) }, 'avg heartrate')), React.createElement.apply(this, ['tbody', {}, ___default.map(this.state.activities, repeatActivity6.bind(this))])), React.createElement('span', {
          'className': 'btn btn-default',
          'onClick': onClick7.bind(this)
      }, 'More'));
  };

  /**
   * facade and scaffolding for the react view.
   *
   * events-view.rt = generated file from the react templates in the view folder.
   */
  var ActivitiesView = function (_Dispatcher) {
  	babelHelpers_inherits(ActivitiesView, _Dispatcher);

  	function ActivitiesView() {
  		babelHelpers_classCallCheck(this, ActivitiesView);

  		console.log('ActivitiesView', ActivitiesViewRt);

  		var _this = babelHelpers_possibleConstructorReturn(this, Object.getPrototypeOf(ActivitiesView).call(this));

  		console.log('ActivitiesView', ActivitiesViewRt);
  		var self = _this;
  		_this.ReactViewClass = React.createClass({

  			getInitialState: function getInitialState() {
  				return {
  					activities: []
  				};
  			},
  			render: function render() {
  				return ActivitiesViewRt.apply(this);
  			},
  			onClick: function onClick(activity) {
  				self.trigger(ActivitiesView.ACTIVITY_CLICKED, activity);
  			},
  			onMoreClick: function onMoreClick() {
  				self.trigger(ActivitiesView.VIEW_MORE_CLICKED);
  			},
  			sort: function sort(field) {
  				this.replaceState({
  					activities: ___default.sortByOrder(this.state.activities, field, false)
  				});
  			}
  		});
  		return _this;
  	}

  	babelHelpers_createClass(ActivitiesView, [{
  		key: 'update',
  		value: function update(data) {
  			this.ReactView.replaceState(data);
  		}
  	}, {
  		key: 'render',
  		value: function render(data) {
  			this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activities'));

  			this.ReactView.replaceState(data);
  		}
  	}]);
  	return ActivitiesView;
  }(Dispatcher);

  ActivitiesView.ACTIVITY_CLICKED = 'activity_clicked';
  ActivitiesView.VIEW_MORE_CLICKED = 'view_more_clicked';

  var ActivitiesController = function () {
  	function ActivitiesController(view, dataSource) {
  		babelHelpers_classCallCheck(this, ActivitiesController);

  		this.dataSource = dataSource;
  		this.view = view;
  		view.on(ActivitiesView.ACTIVITY_CLICKED, this.onActiviyClicked.bind(this));
  		view.on(ActivitiesView.VIEW_MORE_CLICKED, this.onViewMoreClicked.bind(this));
  	}

  	babelHelpers_createClass(ActivitiesController, [{
  		key: 'onActiviyClicked',
  		value: function onActiviyClicked(activity) {
  			this.dataSource.setActivity(activity);
  		}
  	}, {
  		key: 'onViewMoreClicked',
  		value: function onViewMoreClicked() {
  			var _this = this;

  			this.dataSource.getActivities(function (data) {
  				return _this.view.update(_this.dataSource.data);
  			});
  		}
  	}, {
  		key: 'show',
  		value: function show() {
  			this.dataSource.on('update', this.onUpdate.bind(this));
  			this.view.render(this.dataSource.data);
  		}
  	}, {
  		key: 'onUpdate',
  		value: function onUpdate(data) {
  			this.view.update(this.dataSource.data);
  		}
  	}]);
  	return ActivitiesController;
  }();

  var AthleteController = function () {
  	function AthleteController(view, dataSource) {
  		babelHelpers_classCallCheck(this, AthleteController);

  		this.dataSource = dataSource;
  		this.view = view;

  		this.dataSource.on('update', this.onUpdate.bind(this));
  		this.view.render();
  	}

  	babelHelpers_createClass(AthleteController, [{
  		key: 'onUpdate',
  		value: function onUpdate(data) {
  			this.view.render(data.athlete);
  		}
  	}]);
  	return AthleteController;
  }();

  function AthleteViewRt () {
      return React.createElement('div', { 'className': 'athleteView' }, React.createElement('h1', {}, 'Your Strava profile'), React.createElement('h3', { 'className': 'name' }, this.state.firstname, ' ', this.state.lastname));
  };

  /**
   * facade and scaffolding for the react view.
   *
   * events-view.rt = generated file from the react templates in the view folder.
   */
  var AthleteView = function () {
  	function AthleteView() {
  		babelHelpers_classCallCheck(this, AthleteView);

  		this.ReactViewClass = React.createClass({

  			getInitialState: function getInitialState() {
  				return {};
  			},
  			render: function render() {
  				return AthleteViewRt.apply(this);
  			}

  		});
  		this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('athlete'));
  	}

  	babelHelpers_createClass(AthleteView, [{
  		key: 'render',
  		value: function render(data) {

  			this.ReactView.replaceState(data);
  		}
  	}]);
  	return AthleteView;
  }();

  var DataService = function () {
    function DataService() {
      babelHelpers_classCallCheck(this, DataService);
    }

    babelHelpers_createClass(DataService, [{
      key: 'getAthlete',
      value: function getAthlete(cb) {
        var options = {
          headers: { 'Content-Type': 'application/json' },
          path: '/athlete'
        };

        var data = '';
        http.get(options, function (res) {
          res.on('data', function (buf) {
            data += buf;
          });

          res.on('end', function () {
            if (data && data.length) {
              data = JSON.parse(data);
            }
            cb(null, data);
          });
          res.on('error', function (err) {
            cb(err);
          });
        });
      }
    }, {
      key: 'getActivity',
      value: function getActivity(id, cb) {
        var data = '';
        http.get('http://localhost:3000/activity/' + id, function (res) {
          res.on('data', function (buf) {
            data += buf;
          });

          res.on('end', function () {
            cb(null, JSON.parse(data));
          });
          res.on('error', function (err) {
            cb(err);
          });
        });
      }
    }, {
      key: 'getActivities',
      value: function getActivities(page, cb) {
        console.log('getActivities(cb)', page);
        page = page ? page : 1;

        var data = '';
        http.get('http://localhost:3000/activities?page=' + page, function (res) {
          res.on('data', function (buf) {
            data += buf;
          });

          res.on('end', function () {
            cb(null, JSON.parse(data));
          });
          res.on('error', function (err) {
            cb(err);
          });
        });
      }
    }]);
    return DataService;
  }();

  var StravaApp = function () {
  		function StravaApp() {
  				babelHelpers_classCallCheck(this, StravaApp);

  				this.bootstrap();
  				this.router();
  		}

  		babelHelpers_createClass(StravaApp, [{
  				key: 'bootstrap',
  				value: function bootstrap() {
  						var service = new DataService();

  						this.athleteModel = new Athlete(service);

  						this.athleteView = new AthleteView();
  						this.athleteController = new AthleteController(this.athleteView, this.athleteModel);

  						this.activitiesView = new ActivitiesView();
  						this.activitiesController = new ActivitiesController(this.activitiesView, this.athleteModel);

  						this.activityView = new ActivityView();
  						this.activityController = new ActivityController(this.activityView, this.athleteModel);
  				}
  		}, {
  				key: 'router',
  				value: function router() {

  						page('/', this.activitiesController.show.bind(this.activitiesController));
  						page('/activity/:id/view', this.activityController.show.bind(this.activityController));
  						// page('/activity/:id/edit', activity.load, activity.edit)
  						// page('*', notfound)
  						page();
  				}
  		}]);
  		return StravaApp;
  }();

  document.addEventListener("DOMContentLoaded", function (event) {
  	'use strict';

  	var stravaApp = new StravaApp();
  });

}(page,_,React,http,moment));