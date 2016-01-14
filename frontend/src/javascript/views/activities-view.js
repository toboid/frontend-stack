import React from 'React';
import ActivitiesViewRt from './activities-view.rt';
import _ from 'lodash';

import {Dispatcher} from '../lib/dispatcher';

/**
 * facade and scaffolding for the react view.
 *
 * events-view.rt = generated file from the react templates in the view folder.
 */
export class ActivitiesView extends Dispatcher{
	constructor() {
		console.log('ActivitiesView',ActivitiesViewRt)
		super();
		console.log('ActivitiesView',ActivitiesViewRt)
		var self = this;
		this.ReactViewClass = React.createClass({

			getInitialState: function() {
				return {
					activities: []
				};
			},
			render: function() {
				return ActivitiesViewRt.apply(this);
			},
			onClick(activity) {
				self.trigger(ActivitiesView.ACTIVITY_CLICKED, activity);
			},
			onMoreClick() {
				self.trigger(ActivitiesView.VIEW_MORE_CLICKED);
			},
			sort(field) {
				this.replaceState({
					activities: _.sortByOrder(this.state.activities, field, false)
				});
			}
		});
	}
	update(data){
		this.ReactView.replaceState(data);
	}
	render(data) {
		this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activities'));

		this.ReactView.replaceState(data);
	}
}


ActivitiesView.ACTIVITY_CLICKED = 'activity_clicked';
ActivitiesView.VIEW_MORE_CLICKED = 'view_more_clicked';
