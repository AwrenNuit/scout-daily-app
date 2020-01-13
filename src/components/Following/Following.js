import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Following.css';

class Following extends Component{

  render(){
    return(
      <>
          {this.props.reduxState.map(image =>
            <div>
              <img className="avatar" src={"https://scout-daily.s3.us-east-2.amazonaws.com/"+image.image_url} alt={image.username} />
              <div>{image.username}</div>
            </div>
          )}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.followingReducer
});

export default connect(putReduxStateOnProps)(Following);