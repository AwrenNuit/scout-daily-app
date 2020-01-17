import React, {Component} from 'react';
import {connect} from 'react-redux';
import './OtherUserDetails.css';
import Button from '@material-ui/core/Button';

class OtherUserDetails extends Component{

  state = {
    following: false
  }

  UNSAFE_componentWillMount(){
    this.props.dispatch({type: `GET_OTHER_USER_DETAILS`, payload: this.props.id});
    this.props.dispatch({type: `GET_FOLLOWING_DETAILS`, payload: this.props.id});
  }

  componentDidUpdate(prevProps){
    if(this.props.following !== prevProps.following){
      this.seeIfFollowing(); // WHY DOES THIS NOT UPDATE ON FOLLOW CLICK?
    }
  }

  seeIfFollowing = () => {
    console.log('in see if following');
    let details = [];
    for(let num of this.props.following){
      details.push(num.connection_id);
    }
    console.log('details:', details);
    console.log('id:', this.props.reduxState.id); // SOMETIMES UNDEFINED?
    if(details.includes(this.props.reduxState.id)){
      console.log('in there~~~');
      this.setState({following:true});
    }
  }

  handleFollow = (id) => {
    let details = [];
    for(let num of this.props.following){
      details.push(num.connection_id);
    }
    if(!details.includes(id)){
      this.props.dispatch({type: `ADD_FOLLOW`, payload: id});
      this.props.dispatch({type: `GET_FOLLOWING_DETAILS`, payload: this.props.id});
    }
  }

  render(){
    return(
      <div className="main-details-container">
        {JSON.stringify(this.state.following)}
        {JSON.stringify(this.props.reduxState)}
        {JSON.stringify(this.props.following)}
          <div key={this.props.reduxState.id} className="other-user-details-container">
            <img className="avatar" src={this.props.reduxState.avatar} alt={this.props.reduxState.username} />

              <span className="username">{this.props.reduxState.username}</span>
              <span className="bio">{this.props.reduxState.bio}</span>

            <Button variant="contained" color="primary" onClick={()=>this.handleFollow(this.props.reduxState.id)} style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}>
              {this.state.following ? 'Unfollow' : 'Follow'}
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