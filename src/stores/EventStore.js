import {observable, computed, reaction} from 'mobx';
import EventModel from '../models/EventModel';

export default class EventStore {
	@observable events = [];

	constructor({ root }) {
		this.root = root;
		//eventually we'll get this data asynchronously from server; for now, mocked JSON
		//here's some starter JSON for a event:
		`
		{
			'id': 1,
			'name': '',
			'description': '',
			'location': '',
			'group_id' : 1

		}
		`
		let events = [
			{
				'id': 1,
				'name': 'Bloomington Peace Action Coalition Meeting',
				'datestring': '2/24/17 12:00:00 PM',
				'description': 'We believe in social, economic, and climate justice.',
				'location': '47401',
				'group_id': 1,
				'rsvps': [
				{
					'id': 1,
					'user_id': 1,
					'event_id': 1,
					'attending': 'yes'
				}
				]
			},
			{
			'id': 2,
			'name': 'Bloomington IWW Chapter Meeting',
			'datestring': '1/23/17 11:00:00 AM',
			'description': 'Local chapter of Industrial Workers of the World, i.e., "The Wobblies." ',
			'location': '47401',
			'group_id': 1,
			'rsvps': [
				{
					'id': 1,
					'user_id': 1,
					'event_id': 2,
					'attending': 'yes'
				}
				]
			},
			{
			'id': 3,
			'name': 'Immigration reform strategy meeting.',
			'datestring': '3/29/17 1:30:02 AM',
			'description': 'This it. We gonna do it.',
			'location': '47401',
			'group_id': 1,
			'rsvps': [
				{
					'id': 1,
					'user_id': 2,
					'event_id': 3,
					'attending': 'yes'
				}
				]
			},
			{
			'id': 4,
			'name': 'Invisible event meeting',
			'datestring': '3/29/17 1:30:02 AM',
			'description': 'If you see this there\'s a bug.',
			'location': '47401',
			'group_id': 10000,
			'rsvps': [
				{
					'id': 1,
					'user_id': 1000,
					'event_id': 4,
					'attending': 'yes'
				}
				]
			}
		];
		this.events = [];
		events.forEach((ps_event) => {
			this.events.push(new EventModel(this, ps_event));
		});
	}
}