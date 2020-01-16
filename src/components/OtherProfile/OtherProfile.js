import React, {Component} from 'react';
import NavBar from '../NavBar/NavBar';
import RenderOtherUserImage from '../RenderOtherUserImage/RenderOtherUserImage';
import OtherUserDetails from '../OtherUserDetails/OtherUserDetails';

class OtherProfile extends Component{

  render(){
    return(
      <>
        <OtherUserDetails id={this.props.match.params.id} />
        <RenderOtherUserImage id={this.props.match.params.id} />
        <NavBar history={this.props.history.location.pathname} />
      </>
    );
  }
}

export default OtherProfile;