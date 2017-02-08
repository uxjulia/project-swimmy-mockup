import {observable} from 'mobx';

export default class UserModel {
  store;
  id;
	@observable name;
	@observable zipcode;
  @observable profilePictureUrl;

  constructor(store, user) {
    this.store = store;
    this.id = user.id;
    this.firstName = user.givenName;
    this.lastName = user.familyName;
    this.name = user.givenName + ' ' + user.familyName;
    this.zipcode = user.address.postalCode;
    this.city = user.address.locality;
    this.state = user.address.region;
    this.profilePictureUrl = user.profilePictureUrl;
    this.personalStatement = user.personalStatement;
  }
}