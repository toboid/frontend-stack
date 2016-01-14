import React from 'react/addons';
import _ from 'lodash';
import moment from 'moment';
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
export default function () {
    return React.createElement('div', {}, React.createElement('table', { 'className': 'table table-striped table-hover' }, React.createElement('caption', {}, 'Activities'), React.createElement('thead', {}, React.createElement('th', {}), React.createElement('th', { 'onClick': onClick1.bind(this) }, 'moving time'), React.createElement('th', { 'onClick': onClick2.bind(this) }, 'distance'), React.createElement('th', { 'onClick': onClick3.bind(this) }, 'avg speed'), React.createElement('th', { 'onClick': onClick4.bind(this) }, 'avg heartrate')), React.createElement.apply(this, [
        'tbody',
        {},
        _.map(this.state.activities, repeatActivity6.bind(this))
    ])), React.createElement('span', {
        'className': 'btn btn-default',
        'onClick': onClick7.bind(this)
    }, 'More'));
};