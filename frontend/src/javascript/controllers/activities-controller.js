import {Athlete} from '../models/athlete';
import {ActivitiesView} from '../views/activities-view';

export class ActivitiesController {
	constructor(view, dataSource) {
		this.dataSource = dataSource;
		this.view = view;
		view.on(ActivitiesView.ACTIVITY_CLICKED, this.onActiviyClicked.bind(this));
		view.on(ActivitiesView.VIEW_MORE_CLICKED, this.onViewMoreClicked.bind(this));
	}
	onActiviyClicked(activity){
		this.dataSource.setActivity(activity);
	}
	onViewMoreClicked(){
		this.dataSource.getActivities( (data) => this.view.update(this.dataSource.data));

	}
	show(){
		this.dataSource.on('update', this.onUpdate.bind(this));
		this.view.render(this.dataSource.data);
	}

	onUpdate(data) {
		this.view.update(this.dataSource.data);
	}
}
