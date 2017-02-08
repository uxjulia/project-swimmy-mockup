import {observable, computed, reaction} from 'mobx';
import UserModel from '../models/UserModel'
import MembershipModel from '../models/MembershipModel';

export default class UserStore {
	@observable user = {};
	@observable memberships = [];

  constructor({ root }) {
    this.root = root;
		//eventually we'll get this data asynchronously from server
		//we're going to have to suss out on the back-end if we are going to include group
		//memberships as part of the API endpoint for getting a user (maybe as an optional include?)
		//for now, I'm going to assume we are. Otherwise, not only would there be multiple async calls
		//that might collide, but also, when getting user groups, we want to be able to compare user
		//memberships to groups rather than going through each and every member of each and every group
		//to see if the user is a member; that would be very expensive computationally.
		//For the moment, I'm not making a membership store, but it may be necessary in the future.
    //TODO: profile picture URL should also be a CDN in the future? will have to consult with back-end team
    let user = {
      'id': 1,
      'givenName': 'Kathryn',
      'familyName': 'Janeway',
      'address': [
        'locality': 'Bloomington',
        'region': 'IN',
        'postalCode': '47401'
      ],
      'profilePictureUrl': '/src/shared/assets/img/profile.jpeg',
      'personalStatement': "I'm an activist for education, healthcare, and civil rights. I'm willing to protest, knock on doors, and phone call!"
    };
    let memberships = [
      {
        'id': 1,
        'user_id': 1,
        'group_id': 1,
        'role': 'Owner'
      }
    ];
    this.user = new UserModel(this, user);
    memberships.map((membership) => {
      this.memberships.push(new MembershipModel(this, membership.id, membership.user_id, membership.group_id, membership.role));
    });
  }
}