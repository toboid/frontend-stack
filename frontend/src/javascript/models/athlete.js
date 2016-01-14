import {Dispatcher} from '../lib/dispatcher';
import {_} from 'lodash';

export class Athlete extends Dispatcher{
	constructor(dataService){
		super();
		this.data = {
			activities:[],
			activitiesPage : 1
		};
		this.dataService = dataService;
		this.dataService.getAthlete(
			(err, data)=>{
				if(data){
					this.data = data;
					this.setActivity(data.activities[0]);
					this.trigger('update', data);
				}
			}
		);
	}
	getActivity(id,cb){
		var res = _.find(this.data.activities, { 'id': parseInt(id)});
		cb(null,res);
	}
	setActivity(activity){
		this.activity = activity;
		this.trigger(this.SELECTED_ACTIVITY_CHANGE, activity);
	}
	getActivities(cb){
		var self = this;
		console.log(this.data);
		this.data.activitiesPage = this.data.activitiesPage ? this.data.activitiesPage + 1 : 2;
		this.dataService.getActivities(this.data.activitiesPage, function(err, data){
			self.data.activities = self.data.activities.concat(data);
			self.trigger('activities-update', self.data);
			cb(self.data); 
		});
	}
}
