import {Athlete} from '../models/athlete';

export class ActivityController {
	constructor(view, dataSource) {
		this.dataSource = dataSource;
		this.dataSource.on(dataSource.SELECTED_ACTIVITY_CHANGE, this.onActivityChange.bind(this));
		this.view = view;
	}
	show(){
		console.log(arguments);
		
	}
	onActivityChange(data){
		this.view.render(data);
	}
}
