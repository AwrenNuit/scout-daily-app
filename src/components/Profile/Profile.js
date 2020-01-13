import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Profile.css';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar/NavBar';

class Profile extends Component{

  state = {
    bio: '',
    editBio: false
  }
  componentDidMount(){
    this.props.dispatch({type: `GET_ALL_IMAGE`});
    this.props.dispatch({type: `GET_USER_DETAILS`});
  }

  editBio = (bio) => {
    this.setState({
      bio: bio,
      editBio:true
    });
  }

  saveBio = () => {
    this.props.dispatch({type: `UPDATE_BIO`, payload: this.state.bio});
    this.setState({editBio:false});
  }

  handleChange = (e) => {
    this.setState({bio:e.target.value});
  }

  render(){
    return(
      <>
        <div className="main-details-container">
        {JSON.stringify(this.state)}
        {JSON.stringify(this.props.userDetails)}
          {this.props.userDetails.map(details =>
            <div className="user-details-container">
              <img className="avatar" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="" />
              <span className="username">{details.username}</span>

              {this.state.editBio ? 
                <>
                  <input onChange={this.handleChange} value={this.state.bio} /> 
                  <button onClick={this.saveBio}>Save</button>
                </>
                :
                <span className="bio" onClick={()=>this.editBio(details.bio)}>{details.bio}</span>
              }

              <Button variant="contained" color="primary" style={{gridArea:"following",height:"25px"}}>
                Following
              </Button>

            </div>
          )}
        </div>
        <div>
          {this.props.allImage.map(image=>
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
  allImage: reduxState.allImage,
  userDetails: reduxState.userDetails
});

export default connect(putReduxStateOnProps)(Profile);