import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Following.css';
import NavBar from '../NavBar/NavBar';

class Following extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FOLLOWING`});
  }

  // View selected user's profile
  handleClick = (id) => {
    this.props.history.push(`/profile/${id}`);
  }

  render(){
    return(
      <>
        <h2 className="heading-2">Following</h2>
        {this.props.reduxState ?
          <div className="following-main-flex" >
            {this.props.reduxState.map(image =>
              <div className="following-col" key={image.id}>
                <img className="following-avatar" onClick={()=>this.handleClick(image.id)} src={image.avatar} alt={image.username} />
                <div>{image.username}</div>
              </div>
            )}
          </div>
          :
          <p>Not following anyone</p>
        }
        <div className="bottom-whitespace"></div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.following.followingAvatar
});

export default connect(putReduxStateOnProps)(Following);