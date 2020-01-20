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
    let id = details.id;
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
    const details = this.props.reduxState;
    
    return(
      <div className="main-details-container">
          <div key={details.id} className="other-user-details-container">
            <img className="avatar" src={details.avatar} alt={details.username} />

              <span className="username">{details.username}</span>
              <span className="bio">{details.bio}</span>

            <Button variant="contained" color="primary" onClick={()=>this.handleFollow(details.id)} style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}>
              {this.seeIfFollowing() ? 'Unfollow' : 'Follow'}
            </Button>

          </div>
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.otherUserDetails,
  following: reduxState.followingDetails,
});

export default connect(putReduxStateOnProps)(OtherUserDetails);