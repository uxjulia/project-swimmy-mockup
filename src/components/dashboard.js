import React from 'react';
import {observer} from 'mobx-react';

import EventsList from './eventsList';
import GroupsList from './groupsList';

import DevTool from 'mobx-react-devtools';

@observer
export default class Dashboard extends React.Component {
	render() {
		const {userStore} = this.props;

		return (
			<div>
				<h1>Dashboard</h1>
				<ul className="nav nav-tabs" id="ps-dashboard-tabs" role="tablist">
					<li role="presentation" className="active">
						<a href="#events" aria-controls="events" role="tab" data-toggle="tab">Events</a>
					</li>
					<li role="presentation">
						<a href="#groups" aria-controls="groups" role="tab" data-toggle="tab">Groups</a>
					</li>
				</ul>
				<div className="tab-content">
					<div role="tabpanel" className="tab-pane active" id="events">
						<EventsList></EventsList>
					</div>
					<div role="tabpanel" className="tab-pane active" id="groups">
						<GroupsList></GroupsList>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		//init bootstrap tabs; ideally, we would use a library like react-bootstrap, but like everything
		//great, they are still under active development for a 1.0 release and the current library is
		//not accessible. however, they are very concerned with accessibility when the release is done. 
		//let's check them out again over the coming months to see if we could use the library.
		//for now, even though putting jquery here isn't ideal, it at least makes it accessible.

		$('#ps-dashboard-tabs a').click(function (e) {
		  e.preventDefault()
		  $(this).tab('show')
		});
	}
}