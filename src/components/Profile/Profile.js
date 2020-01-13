import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Profile.css';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar/NavBar';

class Profile extends Component{

  render(){
    return(
      <>
        <div className="main-details-container">
          <div className="user-details-container">
            <img className="avatar" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="" />
            <span className="username">USERNAME</span>
            <span className="bio">Software Engineer that enjoys long talks about witches and candlelit rituals</span>

            <Button variant="contained" color="primary" style={{gridArea:"following",backgroundColor:"#ca80ff",height:"25px"}}>
              Following
            </Button>

          </div>
        </div>
        <div>
          {/* {this.props.reduxState.map(image=>
            <span key={image.id}>
              <div className="img" style={{backgroundImage:`url(https://prime-solo-test.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div>
            </span>
          )} */}
        </div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState
});

export default connect(putReduxStateOnProps)(Profile);