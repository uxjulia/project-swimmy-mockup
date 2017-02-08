import React from 'react';
import {observer} from 'mobx-react';
import styles from './profilePictureStyle.scss';

import DevTool from 'mobx-react-devtools';

@observer
export default class ProfilePicture extends React.Component {
  render () {
    const {rootStore} = this.props;

    return (
			<div>
				<img src={rootStore.userStore.user.profilePictureUrl} alt="Profile picture" className={styles.imgProfile} 
				  width="100" height="100" />
			</div>
    );
  }
}
