import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import './ViewThisImage.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NavBar from '../NavBar/NavBar';
import Comment from '../Comment/Comment';

class ViewThisImage extends Component{

  state = {
    like: false,
  }

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.match.params.id});
    this.props.dispatch({type: `GET_LIKE`, payload: this.props.match.params.id});
    
  }

  componentDidUpdate(prevProps){
    if(this.props.like !== prevProps.like){
      if(this.props.like.liked !== true){
        this.setState({
          like: false,
        });
      }
      else{
        this.setState({
          like: true,
        });
      }
    }
  }

  // Dispatch like to saga
  handleLike = (image) => {
    if(this.state.like === false){
      this.props.dispatch({type: `ADD_LIKE`, payload: image});
    }
    else{
      this.props.dispatch({type: `SUB_LIKE`, payload: image});
    }
  }

  render(){
    const details = this.props.reduxState;

    return(
      <>
        <div className="view-card">
          <div>
            <Link to={"/profile/"+details.user_id}>
              <img className="view-avatar" src={details.avatar} alt={details.username} />
              <span className="view-username">{details.username}</span>
            </Link>
          </div>
          <span>
            <center>
              <img className="view-img" src={details.image_url} alt={details.caption} />
            </center>
            <div>
              {this.state.like ?
                <FavoriteIcon 
                  onClick={()=>this.handleLike(details.id)} 
                  style={{marginLeft:"40px",cursor:"pointer",color:"#b50000"}}
                />
                :
                <FavoriteBorderIcon 
                  onClick={()=>this.handleLike(details.id)} 
                  style={{marginLeft:"40px",cursor:"pointer"}}
                />
              }
              <span className="view-likes">{details.likes} likes</span>
            </div>
            <div className="view-caption">{details.caption}</div>
          </span>
        </div>
        <div className="comment-div">
          <hr className="view-hr" />
          <Comment params_id={this.props.match.params.id} />
        </div>
        <div className="bottom-whitespace"></div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.image.viewThisImage,
  user: reduxState.user,
  like: reduxState.like
});

export default connect(putReduxStateOnProps)(ViewThisImage);