import React from 'react';
import {observer} from 'mobx-react';
import views from 'config/views';
import styles from 'screens/styles/loginScreen.css';
import AppWrapper from 'components/appWrapper'
import AuthService from 'utils/AuthService'

class LoginScreen extends React.Component {
  handleOnSubmit(e) {
    e.preventDefault();

    const { auth } = this.props
    auth.login()
  }

  render() {

    return (
      <AppWrapper title='Login' backButton>
        <form className={styles.container} onSubmit={this.handleOnSubmit.bind(this)} method='post'>
          <div className='form-group'>
            <input className={styles.input} type='text' name='email' placeholder='Email'/>
          </div>

          <div className='form-group'>
            <input className={styles.input}  type='password' name='password' placeholder='Password'/>
            <button className={styles.buttons}>login</button>
          </div>
        </form>
      </AppWrapper>
    )
  }
}

export default observer(['store'], LoginScreen);
