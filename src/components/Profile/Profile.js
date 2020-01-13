import React, {Component} from 'react';
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

export default Profile;