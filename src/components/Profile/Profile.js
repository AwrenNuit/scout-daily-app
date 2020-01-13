import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import NavBar from '../NavBar/NavBar';
import RenderUserImage from '../RenderUserImage/RenderUserImage';
import UserDetails from '../UserDetails/UserDetails';

class Profile extends Component{

  render(){
    return(
      <>
        <UserDetails />
        <RenderUserImage />
        <NavBar history={this.props.history.location.pathname} />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  allImage: reduxState.allImage,
  userDetails: reduxState.userDetails
});

export default connect(putReduxStateOnProps)(Profile);