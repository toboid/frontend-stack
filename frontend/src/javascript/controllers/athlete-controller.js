import {Athlete} from '../models/athlete';

export class AthleteController {

	constructor(view, dataSource) {
		this.dataSource = dataSource;
		this.view = view;

		this.dataSource.on('update', this.onUpdate.bind(this));
		this.view.render();
	}

	onUpdate(data) {
		this.view.render(data.athlete);
	}
}