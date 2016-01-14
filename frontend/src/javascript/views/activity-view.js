import React from 'React';
import ActivityViewRt from './activity-view.rt';
import _ from 'lodash';
/**
 * facade and scaffolding for the react view.
 *
 * events-view.rt = generated file from the react templates in the view folder.
 */


export class ActivityView { 
	constructor() {

		this.ReactViewClass = React.createClass({

			getInitialState: function() {
				return {
					data:{}
				};
			},
			render: function() {
				return ActivityViewRt.apply(this);
			}

		});
		this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activity'));

	}

	render(data) {
		console.log(data)

	//	this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('activity'));
		this.ReactView.replaceState({data:data});

	}
}