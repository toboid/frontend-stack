import React from 'React';
import _ from 'lodash';
export default function () {
    return React.createElement('div', { 'className': 'athleteView' }, React.createElement('h1', {}, 'Your Strava profile'), React.createElement('h3', { 'className': 'name' }, this.state.firstname, ' ', this.state.lastname));
};