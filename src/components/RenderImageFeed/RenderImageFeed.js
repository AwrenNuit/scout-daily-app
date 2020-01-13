import React, {Component} from 'react';
import {connect} from 'react-redux';

class RenderAllImage extends Component{

  // GET images to render
  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  render(){
    return(
      <>
        {this.props.reduxState ? this.props.reduxState.map(image=>
          <span key={image.id}>
            <div className="all-img" style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div>
          </span>
        ) : <p>Follow someone</p>}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.imageFeedreducer
});

export default connect(putReduxStateOnProps)(RenderAllImage);