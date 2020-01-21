import React, {Component} from 'react';
import { Link } from "react-router-dom";
import './RenderImageFeed.css';
import LikeFeedImage from '../LikeFeedImage/LikeFeedImage';

class RenderImageFeed extends Component{

  render(){
    return(
      <div className="feed-card first-card">
        <div>
          <Link to={"/profile/"+this.props.image.user_id}>
            <img className="feed-avatar" src={this.props.image.avatar} alt={this.props.image.username} />
            <span className="feed-username">{this.props.image.username}</span>
          </Link>
        </div>
        <span>
          <center>
            <Link to={"/view-image/"+this.props.image.id}>
              <img className="feed-img" src={this.props.image.image_url} alt={this.props.image.caption} />
            </Link>
          </center>
          <div>
          <LikeFeedImage image={this.props.image} />
            <span className="feed-likes">{this.props.image.likes} likes</span>
          </div>
          <div className="feed-caption">{this.props.image.caption}</div>
        </span>
      </div>
    );
  }
}

export default RenderImageFeed;