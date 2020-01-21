import React, {Component} from 'react';
import {connect} from 'react-redux';
import RenderImageFeed from '../RenderImageFeed/RenderImageFeed';

class ImageFeed extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  render(){
    return(
      <>
        {this.props.reduxState ? 
          this.props.reduxState.map(image=>
            <div key={image.id}>
              <RenderImageFeed image={image} />
            </div>
          ) 
          : 
          <p>Follow someone</p>
        }
        <div className="bottom-whitespace"></div>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.imageFeed
});

export default connect(putReduxStateOnProps)(ImageFeed);