import React, {Component} from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import './UserDetails.css';
import AvatarEditor from 'react-avatar-editor';
import Button from '@material-ui/core/Button';

class UserDetails extends Component{

  state = {
    username: '',
    editUsername: false,
    bio: '',
    editBio: false,
    editAvatar: false,
    scale: 1
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_USER_DETAILS`});
  }

  // editAvatar = () => {
  //   this.setState({editAvatar:true});
  // }

  editDetails = (propName, propValue, propEdit) => {
    this.setState({
      [propName]: propValue,
      [propEdit]: true
    });
  }

  handleChange = (e, propName) => {
    this.setState({[propName]:e.target.value});
  }

  handleFollowing = () => {
    this.props.history.push('/following');
  }

  saveBioChange = () => {
    this.props.dispatch({type: `UPDATE_BIO`, payload: this.state.bio});
    this.setState({editBio:false});
  }

  saveUsernameChange = () => {
    this.props.dispatch({type: `UPDATE_USERNAME`, payload: this.state.username});
    this.setState({editUsername:false});
  }

  render(){
    return(
      <div className="main-details-container">
        {this.props.reduxState.map(details =>
          <div key={details.id} className="user-details-container">


            {/* {this.state.editAvatar ?
              <>
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={this.state.file}
                  width={100}
                  height={100}
                  border={50}
                  color={[0, 0, 0, 0.8]} // RGBA
                  scale={this.state.scale}
                  rotate={0}
                />
                <span>Zoom:</span> 
                <input type="range" step="0.1" min="1" max="2" name="scale" value={this.state.scale} onChange={this.handleZoom} />
                <input type="file" onChange={this.handleFileChange}/>
              </>
              :
              <img className="avatar" onClick={this.editAvatar} src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="" />
            } */}


            <img className="avatar" src="https://media-exp1.licdn.com/dms/image/C4E03AQE-v_eVE9CJAg/profile-displayphoto-shrink_200_200/0?e=1584576000&v=beta&t=2U4Yq2BPhgoqdAuEQniqRhEKMUGBG1xkc9bh8OKRIxg" alt="" />

            {this.state.editUsername && !this.state.editBio ? 
              <input onChange={(event)=>this.handleChange(event, 'username')} onBlur={this.saveUsernameChange} value={this.state.username} /> 
              :
              <span className="username" onClick={()=>this.editDetails('username', details.username, 'editUsername')}>{details.username}</span>
            }

            {this.state.editBio && !this.state.editUsername ? 
              <input onChange={(event)=>this.handleChange(event, 'bio')} onBlur={this.saveBioChange} value={this.state.bio} /> 
              :
              <span className="bio" onClick={()=>this.editDetails('bio', details.bio, 'editBio')}>{details.bio}</span>
            }

            <Button variant="contained" color="primary" onClick={this.handleFollowing} style={{gridArea:"following",height:"25px"}}>
              Following
            </Button>

          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.userDetails
});

export default withRouter(connect(putReduxStateOnProps)(UserDetails));