import React, {Component} from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import './UserDetails.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class UserDetails extends Component{

  state = {
    username: '',
    editUsername: false,
    bio: '',
    editBio: false,
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_USER_DETAILS`});
  }

  // Dispatch bio updates to saga
  dispatchBio = () => {
    this.props.dispatch({type: `UPDATE_BIO`, payload: this.state.bio});
  }

  // Dispatch username updates to saga
  dispatchUsername = () => {
    this.props.dispatch({type: `UPDATE_USERNAME`, payload: this.state.username});
  }

  // Update user's avatar
  editAvatar = () => {
    this.props.history.push('/edit-avatar');
  }

  // Set the edit on click
  editDetails = (propName, propValue, propEdit) => {
    this.setState({
      [propName]: propValue,
      [propEdit]: true
    });
  }

  // Update bio or username state
  handleChange = (e, propName) => {
    this.setState({[propName]:e.target.value});
  }

  // View followed users
  handleFollowing = () => {
    this.props.history.push('/following');
  }

  // Save bio changes to database, turn off edit mode
  saveBioChange = () => {
  this.dispatchBio();
  this.turnOffBioEdit();
  }

  // Save username changes to database, turn off edit mode
  saveUsernameChange = () => {
    this.dispatchUsername();
    this.turnOffUsernameEdit();
  }

  // Turn off conditionally-rendered bio edit
  turnOffBioEdit = () => {
    this.setState({editBio:false});
  }

  // Turn off conditionally-rendered username edit
  turnOffUsernameEdit = () => {
    this.setState({editUsername:false});
  }

  render(){
    const details = this.props.reduxState;
    return(
      <div className="main-details-container">
          <div key={details.id} className="user-details-container">
            <img 
              className="avatar" 
              onClick={this.editAvatar} 
              src={details.avatar} 
              alt={details.username} 
            />
            <div className="avatar-fab">
              <AddIcon style={{fontSize:"10px",paddingTop:"5px"}} />
            </div>
            {this.state.editUsername && !this.state.editBio ? 
              <input 
                onChange={(event)=>this.handleChange(event, 'username')} 
                onBlur={this.saveUsernameChange} 
                value={this.state.username} 
                style={{gridArea:"username"}}
                autoFocus 
              /> 
              :
              <span 
                className="username" 
                onClick={()=>this.editDetails('username', details.username, 'editUsername')}
              >
                {details.username}
              </span>
            }

            {this.state.editBio && !this.state.editUsername ? 
              <input 
                onChange={(event)=>this.handleChange(event, 'bio')} 
                onBlur={this.saveBioChange} 
                value={this.state.bio} 
                maxLength="100"
                autoFocus 
                style={{width:"200px",gridArea:"bio"}}
              /> 
              :
              <span 
                className="bio" 
                onClick={()=>this.editDetails('bio', details.bio, 'editBio')}
              >
                {details.bio}
              </span>
            }
            <Button 
              variant="contained" 
              color="primary" 
              onClick={this.handleFollowing} 
              style={{gridArea:"following",height:"25px",backgroundColor:"#bc75ff"}}
            >
              Following
            </Button>
          </div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.details.userDetails
});

export default withRouter(connect(putReduxStateOnProps)(UserDetails));