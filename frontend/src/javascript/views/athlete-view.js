import React from 'React';
import AthleteViewRt from './athlete-view.rt';

/**
 * facade and scaffolding for the react view.
 *
 * events-view.rt = generated file from the react templates in the view folder.
 */
export class AthleteView {

	constructor() {

		this.ReactViewClass = React.createClass({

			getInitialState: function() {
				return {
					
				};
			},
			render: function() {
				return AthleteViewRt.apply(this);
			}

		});
		this.ReactView = React.render(React.createElement(this.ReactViewClass), document.getElementById('athlete'));
	}

	render(data) {

		this.ReactView.replaceState(data);
	}
}