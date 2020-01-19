import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import './ViewThisImage.css';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NavBar from '../NavBar/NavBar';

class ViewThisImage extends Component{

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.match.params.id});
  }

  handleLike = (id) => {
    this.props.dispatch({type: `ADD_LIKE`, payload: id});
  }

  render(){
    return(
      <>
        <div className="view-card">
          <div>
            <Link to={"/profile/"+this.props.reduxState.user_id}>
              <img className="view-avatar" src={this.props.reduxState.avatar} alt={this.props.reduxState.username} />
              <span className="view-username">{this.props.reduxState.username}</span>
            </Link>
          </div>
          <span>
            <center>
              <img className="view-img" src={this.props.reduxState.image_url} alt={this.props.reduxState.caption} />
            </center>
            <div>
              <FavoriteBorderIcon 
                onClick={()=>this.handleLike(this.props.reduxState.id)} 
                style={{marginLeft:"40px",cursor:"pointer"}}
              />
              <span className="view-likes">{this.props.reduxState.likes} likes</span>
            </div>
            <center>
              <div className="view-caption">{this.props.reduxState.caption}</div>
            </center>
          </span>
        </div>
        <div>COMMENTS GO HERE</div>
        <div className="bottom-whitespace"></div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.viewThisImage
});

export default connect(putReduxStateOnProps)(ViewThisImage);