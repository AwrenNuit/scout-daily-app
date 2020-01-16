import React, {Component} from 'react';
import {connect} from 'react-redux';
import './RenderUserImage.css';
import {Link} from 'react-router-dom';

class RenderUserImage extends Component{

  UNSAFE_componentWillMount(){
    this.props.dispatch({type: `GET_ALL_OTHER_USER_IMAGE`});
  }

  render(){
    return(
      <div>
        {this.props.reduxState ? this.props.reduxState.map(image=>
            <span key={image.id}>
                {/* <div className="img" style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div> */}
              <Link to={"/edit-photo/"+image.id}>
                <img className="other-user-img" src={image.image_url} alt={image.description} />
              </Link>
            </span>
          )
          :
          <p>No posts yet</p>
        }
      </div>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.allImage
});

export default connect(putReduxStateOnProps)(RenderUserImage);