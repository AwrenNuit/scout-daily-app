import React from 'react';
import {Link} from "react-router-dom";
import './RenderImageFeed.css';
import LikeFeedImage from '../LikeFeedImage/LikeFeedImage';

export default function RenderImageFeed(props) {

  const image = props.image;

  return(
    <div className="feed-card first-card">
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
  );
}