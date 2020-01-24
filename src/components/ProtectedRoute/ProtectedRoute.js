import React from 'react';
import {Route} from 'react-router-dom'
import {connect} from 'react-redux';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

const ProtectedRoute = (props) => {

  const {
    // Alias prop 'component' as 'ComponentToProtect'
    component: ComponentToProtect,
    user,
    loginMode,
    ...otherProps
  } = props;

  let ComponentToShow;

  if(user.id) {
    // if the user is logged in (only logged in users have ids)
    // show the component that is protected
    ComponentToShow = ComponentToProtect;
  } else if (loginMode === 'login') {
    // if they are not logged in, check the loginMode on Redux State
    // if the mode is 'login', show the LoginPage
    ComponentToShow = LoginPage;
  } else {
    // the the user is not logged in and the mode is not 'login'
    // show the RegisterPage
    ComponentToShow = RegisterPage;
  }

  return (
      <Route
        {...otherProps}
        component={ComponentToShow}
      />
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loginMode: state.loginMode,
  }
}

export default connect(mapStateToProps)(ProtectedRoute)


