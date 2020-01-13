import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Profile.css';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar/NavBar';

class Profile extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_ALL_IMAGE`});
  }

  render(){
    return(
      <>
        <div className="main-details-container">
          <div className="user-details-container">
            <img className="avatar" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="" />
            <span className="username">USERNAME</span>
            <span className="bio">Software Engineer that enjoys long talks about witches and candlelit rituals</span>

            <Button variant="contained" color="primary" style={{gridArea:"following",height:"25px"}}>
              Following
            </Button>

          </div>
        </div>
        <div>
          {this.props.reduxState.map(image=>
            <span key={image.id}>
                {/* <div className="img" style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div> */}
              <Link to={"/edit-photo/"+image.id}>
                <img src={image.image_url} alt={image.description} />
              </Link>
            </span>
          )}
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.allImage
});

export default connect(putReduxStateOnProps)(Profile);