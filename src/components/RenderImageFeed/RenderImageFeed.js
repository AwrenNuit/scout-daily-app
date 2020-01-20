import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './RenderImageFeed.css';
import LikeFeedImage from '../LikeFeedImage/LikeFeedImage';

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
            <div className="feed-card" key={image.id} >
              <div>
                <Link to={"/profile/"+image.user_id}>
                  <img className="feed-avatar" src={image.avatar} alt={image.username} />
                  <span className="feed-username">{image.username}</span>
                </Link>
              </div>
              <span>
                <center>
                  <Link to={"/view-image/"+image.id}>
                    <img className="feed-img" src={image.image_url} alt={image.caption} />
                  </Link>
                </center>
                <div>
                <LikeFeedImage image={image} />
                  <span className="feed-likes">{image.likes} likes</span>
                </div>
                <div className="feed-caption">{image.caption}</div>
              </span>
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

export default connect(putReduxStateOnProps)(RenderImageFeed);