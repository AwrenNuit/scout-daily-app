import React, {Component} from 'react';
import {connect} from 'react-redux';

class RenderImage extends Component{

  // GET images to render
  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE`});
  }

  render(){
    return(
      <>
        {this.props.reduxState.map(image=>
          <span key={image.id}>
            <div className="img" style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div>
          </span>
        )}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.allImageReducer
});

export default connect(putReduxStateOnProps)(RenderImage);