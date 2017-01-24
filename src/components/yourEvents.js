import React from 'react';
import {observer} from 'mobx-react';
import {computed, action, observable} from 'mobx';

import EventListItem from './eventListItem';

import DevTool from 'mobx-react-devtools';

@observer
export default class YourEvents extends React.Component {
	@observable filterBy = "Upcoming";
	@observable events = this.props.rootStore.eventStore.events;
	@observable user = this.props.rootStore.userStore.user;
	@observable memberships = this.props.rootStore.userStore.memberships;
	@observable groups = this.props.rootStore.groupStore.groups.filter((group) => { // filter the groups down to the ones the user is a part of
		var member = false;
		this.memberships.forEach((membership) => {
			if (membership.group_id === group.id) {
				member = true;
			}
		});
		return member;
	});

	render() {
		const {rootStore} = this.props;
		return (
		<div>
			<h3>Your Events</h3>
			<button onClick={this.setUpcoming}>Upcoming</button>
			<button onClick={this.setNew}>New</button>
			<button onClick={this.setOld}>Old</button>

			<div className="list-event">
				{/* ideally, the API would provide groups as an include along with memberships, but for now, filter it */}
				{this.filterEvents
				.sort(this.datestringCompareFunction) // sooner events show up first
				.map(ps_event => {
					return <EventListItem rootStore={rootStore} ps_event={ps_event} key={ps_event.id}></EventListItem>;
				})}
			</div>
		</div>
	);
	}

	toggleSearch = () => {
		let searchVisible = !this.state.searchVisible;
		this.setState({
			searchVisible: searchVisible
		});
	}

	// Compare function by date for list.sort, a and b are datetime strings compatible with Date.
	datestringCompareFunction = (a, b) => {
		var aDate = new Date(a.datestring);
		var bDate = new Date(b.datestring);

		if (aDate > bDate) {
			return 1;
		} else if (aDate < bDate){
			return -1;
		} else { // dates are equal
			return 0
		}
	}

	// Why are there 3 different functions here you ask? When i give an argument to the "onClick" method of the button it fires once for each button on page load and then does not fire on click. 
	//  I'm sure whoevers reading this knows exactly why thats happenning, please email me and tell me [jstaley08@gmail.com].
	@action setUpcoming = () => {
		this.filterBy="Upcoming";
	}

	@action setNew = () => {
		this.filterBy="New";
	}

	@action setOld = () => {
		this.filterBy="Old";
	}

	@computed get filterEvents() {
		let filteredList = this.events.filter((ps_event) => {
			var valid = false;
			var userDidRSVP = false;
			var userWillAttend = false;
			var dateHasPassed = (Date.now() > new Date(ps_event.datestring)) ? true : false;

			ps_event.rsvps.forEach((rsvp) => { // check that status of the user's RSVP for this event
				if (rsvp.user_id === this.user.id) {
					userDidRSVP = true;
					if (rsvp.attending === "yes") {
						userWillAttend = true;
					}
				}
			});

			if (this.filterBy === "Upcoming") {

				valid = (!dateHasPassed && userDidRSVP && userWillAttend) // Upcoming event the user will attend

			} else if (this.filterBy === "New") { // Events in the user's groups that the user has not RSVPd to

				var eventInGroup = false;
				this.groups.forEach((group) => {
					if (group.id === ps_event.group_id) {
						eventInGroup = true;
					}
				});
				valid = (!userDidRSVP && eventInGroup);

			} else if (this.filterBy === "Old") { // Past events that the user has rsvp'd to

				valid = (userDidRSVP && dateHasPassed);
				
			} else {
				console.log("ERROR: filterBy unknown in YourEvents::filterEvents.");
			}
			return valid;
		});
		return filteredList;
	}
}