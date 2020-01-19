import React, {Component} from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import './UserDetails.css';
import AvatarEditor from 'react-avatar-editor';
import Button from '@material-ui/core/Button';

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

  editAvatar = () => {
    this.props.history.push('/edit-avatar');
  })

  editDetails = (propName, propValue, propEdit) => {
    this.setState({
      [propName]: propValue,
      [propEdit]: true
    });
  }

  handleChange = (e, propName) => {
    this.setState({[propName]:e.target.value});
  }

  handleFollowing = () => {
    this.props.history.push('/following');
  }

  saveBioChange = () => {
    this.props.dispatch({type: `UPDATE_BIO`, payload: this.state.bio});
    this.setState({editBio:false});
  }

  saveUsernameChange = () => {
    this.props.dispatch({type: `UPDATE_USERNAME`, payload: this.state.username});
    this.setState({editUsername:false});
  }

  render(){
    return(
      <div className="main-details-container">
        {this.props.reduxState.map(details =>
          <div key={details.id} className="user-details-container">

            <img className="avatar" onClick={this.editAvatar} src={details.avatar} alt={details.username} />

            {this.state.editUsername && !this.state.editBio ? 
              <input onChange={(event)=>this.handleChange(event, 'username')} onBlur={this.saveUsernameChange} value={this.state.username} /> 
              :
              <span className="username" onClick={()=>this.editDetails('username', details.username, 'editUsername')}>{details.username}</span>
            }

            {this.state.editBio && !this.state.editUsername ? 
              <input onChange={(event)=>this.handleChange(event, 'bio')} onBlur={this.saveBioChange} value={this.state.bio} /> 
              :
              <span className="bio" onClick={()=>this.editDetails('bio', details.bio, 'editBio')}>{details.bio}</span>
            }

            <Button variant="contained" color="primary" onClick={this.handleFollowing} style={{gridArea:"following",height:"25px",backgroundColor:"#bc75ff"}}>
              Following
            </Button>

          </div>
        )}
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.userDetails
});

export default withRouter(connect(putReduxStateOnProps)(UserDetails));