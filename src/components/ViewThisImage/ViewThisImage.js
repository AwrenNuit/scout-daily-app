import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import './ViewThisImage.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NavBar from '../NavBar/NavBar';
import Comment from '../Comment/Comment';

class ViewThisImage extends Component{

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.match.params.id});
  }

  // Dispatch like to saga
  handleLike = (id) => {
    this.props.dispatch({type: `ADD_LIKE`, payload: id});
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
              <FavoriteBorderIcon 
                onClick={()=>this.handleLike(details.id)} 
                style={{marginLeft:"40px",cursor:"pointer"}}
              />
              <span className="view-likes">{details.likes} likes</span>
            </div>
            <div className="view-caption">{details.caption}</div>
          </span>
        </div>
        <hr className="view-hr" />
        <Comment params_id={this.props.match.params.id} />
        <div className="bottom-whitespace"></div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.viewThisImage,
});

export default connect(putReduxStateOnProps)(ViewThisImage);