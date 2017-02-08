import React from 'react';
import {observer} from 'mobx-react';
import views from '../config/views';
import styles from './styles/profileScreen.scss';
import ProfilePicture from '../components/profilePicture/profilePicture';

class ProfileScreen extends React.Component {
  render() {
    const { store } = this.props;
    const {router: {goTo}} = store;
    let user = store.userStore.user;

    return (
      <div className={styles.profileScreen}>
        <div className="row">
          <div className="col-xs-4">
            <ProfilePicture rootStore={store}/>
          </div>
          <div className="col-xs-6">
            <h2 className={styles.profileName}>{user.name}</h2>
            <p className={styles.profileCity}>{user.city}, {user.state}</p>
          </div>
          <div className="col-xs-2 text-right">
            <span className={styles.profileSettings + ' fa fa-cog fa-lg'} aria-hidden="true"></span>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <p className={styles.profileStatement}>{user.personalStatement}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default observer(['store'], ProfileScreen);
