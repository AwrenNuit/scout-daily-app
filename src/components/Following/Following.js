import React, {Component} from 'react';
import {connect} from 'react-redux';

class Following extends Component{

  render(){
    return(
      <>
          {this.props.reduxState.map(image =>
            <div>
              <img className="avatar" src={"https://scout-daily.s3.us-east-2.amazonaws.com/"+image.image_url} alt={image.username} />
              <span>{image.username}</span>
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