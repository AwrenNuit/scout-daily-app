import React, {Component} from 'react';
import {connect} from 'react-redux';
import './OtherUserDetails.css';
import Button from '@material-ui/core/Button';

class OtherUserDetails extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_OTHER_USER_DETAILS`, payload: this.props.id});
  }

  handleFollow = (id) => {
    this.props.dispatch({type: `ADD_FOLLOW`, payload: id});
  }

  render(){
    return(
      <div className="main-details-container">
        {this.props.reduxState.map(details =>
          <div key={details.id} className="other-user-details-container">
            <img className="avatar" src={details.avatar} alt={details.username} />

              <span className="username">{details.username}</span>
              <span className="bio">{details.bio}</span>

            <Button variant="contained" color="primary" onClick={()=>this.handleFollow(details.id)} style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}>
              Follow
            </Button>

          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.otherUserDetails
});

export default connect(putReduxStateOnProps)(OtherUserDetails);