import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

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
        {this.props.reduxState ? this.props.reduxState.map(image=>
            <span key={image.id}>
              <Link to={"/view-photo/"+image.id}>
                <div className="all-img" style={{backgroundImage:`url(${image.image_url})`}}></div>
              </Link>
              <div>{image.caption}</div>
              <span onClick={()=>this.handleLike(image.id)}>Like</span>
            </span>
          ) : <p>Follow someone</p>
        }
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.imageFeedReducer
});

export default connect(putReduxStateOnProps)(RenderImageFeed);