import React, {Component} from 'react';
import {connect} from 'react-redux';
import './OtherUserDetails.css';
import Button from '@material-ui/core/Button';

class OtherUserDetails extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_OTHER_USER_DETAILS`});
  }

  handleFollow = (id) => {
    this.props.dispatch({type: `ADD_FOLLOW`, payload: id});
  }

  render(){
    return(
      <div className="main-details-container">
        {this.props.reduxState.map(details =>
          <div key={details.id} className="other-user-details-container">
            <img className="avatar" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="avatar" />

              <span className="username">{details.username}</span>
              <span className="bio">{details.bio}</span>

            <Button variant="contained" color="primary" onClick={()=>this.handleFollow(details.id)} style={{gridArea:"follow",height:"25px"}}>
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