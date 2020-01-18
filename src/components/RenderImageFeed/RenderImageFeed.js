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
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  render(){
    return(
      <>
        {this.props.reduxState ? 
          this.props.reduxState.map(image=>
            <center className="feed-card" key={image.id} >
              <span>
                <Link to={"/view-image/"+image.id}>
                  <img className="feed-img" src={image.image_url} alt={image.caption} />
                </Link>
                <div>
                  <FavoriteBorderIcon onClick={()=>this.handleLike(image.id)} />
                  <span>{image.likes} likes</span>
                </div>
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