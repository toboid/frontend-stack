// Our main application
// Bootstrap the MVC pattern.

import {Athlete} from './models/athlete';

import {AthleteView} from './views/athlete-view';
import {AthleteController} from './controllers/athlete-controller';
import {ActivitiesView} from './views/activities-view';
import {ActivityView} from './views/activity-view';
import {ActivitiesController} from './controllers/activities-controller';
import {ActivityController} from './controllers/activity-controller';
import {DataService} from './services/strava-data-service';
import page from 'page';

export class StravaApp {
	constructor() {
		this.bootstrap();
		this.router();
	}

	bootstrap() {
		var service = new DataService();

		this.athleteModel = new Athlete(service);

		this.athleteView = new AthleteView();
		this.athleteController = new AthleteController(this.athleteView, this.athleteModel);

		this.activitiesView = new ActivitiesView();
		this.activitiesController = new ActivitiesController(this.activitiesView, this.athleteModel);

		this.activityView = new ActivityView();
		this.activityController = new ActivityController(this.activityView, this.athleteModel);

		
	}
	router(){

		page('/', this.activitiesController.show.bind(this.activitiesController))
		page('/activity/:id/view', this.activityController.show.bind(this.activityController))
		// page('/activity/:id/edit', activity.load, activity.edit)
		// page('*', notfound)
		page()
	}
}
