import React, {Component} from 'react';
import {connect} from 'react-redux';
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
        <center>
          <div>
            <div>
              <img className="view-img" src={this.props.reduxState.image_url} alt={this.props.reduxState.caption} />
            </div>
            <div>{this.props.reduxState.caption}</div>
            <FavoriteBorderIcon onClick={()=>this.handleLike(this.props.reduxState.id)} />
            {this.props.reduxState.likes} likes
          </div>
            <div>COMMENTS GO HERE</div>
        </center>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.viewThisImage
});

export default connect(putReduxStateOnProps)(ViewThisImage);