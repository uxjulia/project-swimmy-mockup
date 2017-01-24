import React from 'react';
import {observer} from 'mobx-react';

import DevTool from 'mobx-react-devtools';

@observer
export default class EventListItem extends React.Component {
	render() {
		const {rootStore, ps_event} = this.props;

		return (
			<a className="list-group-item" href="#">
				<p className="lead">{ps_event.name}</p>
				{this.parseDate(ps_event)}
				<p><strong>Description: </strong>{ps_event.description}</p>
			</a>
			);
	}

	parseDate (ps_event) {
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

		var date = new Date(Date.parse(ps_event.datestring));

		var day = date.getDay();
		var month = date.getMonth();
		var monthDay = date.getDate();
		var year = date.getFullYear();

		var hours = date.getHours();
		var minutes = date.getMinutes();
		minutes = minutes > 9 ? minutes : "0" + minutes; // add a leading zero for 0-9 minutes

		var ampm = (hours >= 12 ? "PM" : "AM");

		return (<p>{days[day]} {months[month]} {this.daySuffix(monthDay)} {year} at {hours}:{minutes} {ampm}</p>);
	}

	daySuffix(i) {
	    var j = i % 10,
	        k = i % 100;
	    if (j == 1 && k != 11) {
	        return i + "st";
	    }
	    if (j == 2 && k != 12) {
	        return i + "nd";
	    }
	    if (j == 3 && k != 13) {
	        return i + "rd";
	    }
	    return i + "th";
	}
}