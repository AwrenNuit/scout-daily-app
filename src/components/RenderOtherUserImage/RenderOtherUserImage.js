import React, {Component} from 'react';
import {connect} from 'react-redux';
import './RenderOtherUserImage.css';
import {Link} from 'react-router-dom';

class RenderUserImage extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_ALL_OTHER_USER_IMAGE`, payload: this.props.id});
  }

  render(){
    return(
      <div>
        {this.props.reduxState ? 
          this.props.reduxState.map(image=>
            <span key={image.id}>
              <Link to={"/view-image/"+image.id}>
                <img className="other-user-img" src={image.image_url} alt={image.description} />
              </Link>
            </span>
          )
          :
          <p>No posts yet</p>
        }
        <div className="bottom-whitespace"></div>
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.otherUserImage
});

export default connect(putReduxStateOnProps)(RenderUserImage);