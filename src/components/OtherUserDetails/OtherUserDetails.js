import React, {Component} from 'react';
import {connect} from 'react-redux';
import './OtherUserDetails.css';
import Button from '@material-ui/core/Button';

class OtherUserDetails extends Component{

  state = {
    following: false
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_OTHER_USER_DETAILS`, payload: this.props.id});
    this.props.dispatch({type: `GET_FOLLOWING_DETAILS`});
  }

  // Checks if current user is following this user, conditionally renders follow/unfollow button based on result
  seeIfFollowing = () => {
    let details = [];
    let id = this.props.reduxState.id;
    for(let num of this.props.following){
      details.push(num.connection_id);
    }
    if(details.includes(id)){
      return true;
    }
    return false;
  }

  // Either follows or unfollows
  handleFollow = (id) => {
    let details = [];
    for(let num of this.props.following){
      details.push(num.connection_id);
    }
    if(!details.includes(id)){
      this.props.dispatch({type: `ADD_FOLLOW`, payload: id});
    }
    else if(details.includes(id)){
      this.props.dispatch({type: `REMOVE_FOLLOW`, payload: id});
    }
  }

  render(){
    const user_details = this.props.reduxState;

    return(
      <div className="main-details-container">
          <div key={user_details.id} className="other-user-details-container">
            <img className="avatar" src={user_details.avatar} alt={user_details.username} />
            <span className="username">{user_details.username}</span>
            <span className="bio">{user_details.bio}</span>
            {this.props.user ?
              <Button 
                variant="contained" 
                color="primary" 
                onClick={()=>this.handleFollow(user_details.id)} 
                style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}
              >
                {this.seeIfFollowing() ? 'Unfollow' : 'Follow'}
              </Button>
              :
              <Button 
                variant="contained" 
                color="primary" 
                style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}
              >
                Log in to follow
              </Button>
            }
          </div>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.otherUserDetails,
  following: reduxState.followingDetails,
  user: reduxState.user
});

export default connect(putReduxStateOnProps)(OtherUserDetails);