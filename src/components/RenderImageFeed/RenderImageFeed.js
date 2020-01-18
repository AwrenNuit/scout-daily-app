import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './RenderImageFeed.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class RenderImageFeed extends Component{

  // GET images to render
  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  handleLike = (id) => {
    this.props.dispatch({type: `ADD_LIKE`, payload: id});
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
                  <FavoriteBorderIcon onClick={()=>this.handleLike(image.id)} style={{marginLeft:"40px"}} />
                  <span className="feed-likes">{image.likes} likes</span>
                </div>
                <center>
                  <div className="feed-caption">{image.caption}</div>
                </center>
              </span>
            </div>
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