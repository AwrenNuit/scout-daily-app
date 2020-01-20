import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import './RenderImageFeed.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class RenderImageFeed extends Component{

  state = {
    like: false
  }

  // GET images to render
  componentDidMount(){
    this.props.dispatch({type: `GET_IMAGE_FEED`});
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      if(this.props.reduxState.liked === null || this.props.reduxState.liked === false){
        this.setState({like: false});
      }
      else{
        this.setState({like: true});
      }
    }
  }

  // Dispatch like to saga
  handleLike = (image) => {
    if(this.state.like === false){
      this.props.dispatch({type: `ADD_LIKE`, payload: image});
    }
    else{
      this.props.dispatch({type: `DELETE_LIKE`, payload: image});
    }
  }

  render(){
    return(
      <>
        {this.props.reduxState ? 
          this.props.reduxState.map(image=>
            <div className="feed-card" key={image.id} >
              {JSON.stringify(image.liked)}
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
                {this.state.like ?
                  <FavoriteIcon 
                    onClick={()=>this.handleLike(image.id)} 
                    style={{marginLeft:"40px",cursor:"pointer",color:"#bc75ff"}}
                  />
                  :
                  <FavoriteBorderIcon 
                    onClick={()=>this.handleLike(image.id)} 
                    style={{marginLeft:"40px",cursor:"pointer"}}
                  />
                }
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