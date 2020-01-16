import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './RenderImageFeed.css';

class RenderImageFeed extends Component{

  // GET images to render
  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  render(){
    return(
      <>
        {this.props.reduxState ? 
          this.props.reduxState.map(image=>
            <center className="feed-card" key={image.id} >
              <span>
                <Link to={"/view-photo/"+image.id}>
                  <img className="feed-img" src={image.image_url} alt={image.caption} />
                </Link>
                <div className="feed-caption">{image.caption}</div>
              </span>
            </center>
          ) 
          : 
          <p>Follow someone</p>
        }
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.imageFeed
});

export default connect(putReduxStateOnProps)(RenderImageFeed);