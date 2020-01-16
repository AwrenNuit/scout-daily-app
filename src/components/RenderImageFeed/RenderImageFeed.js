import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './RenderImageFeed.css';

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
            <span key={image.id}>
              <Link to={"/view-photo/"+image.id}>
                <img className="feed-img" src={image.image_url} alt={image.caption} />
              </Link>
              <div>{image.caption}</div>
              <div onClick={()=>this.handleLike(image.id)}>Like</div>
            </span>
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