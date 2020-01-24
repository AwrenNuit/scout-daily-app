import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EditAvatar.css';
import AvatarEditor from 'react-avatar-editor';
import NavBar from '../NavBar/NavBar';
import Button from '@material-ui/core/Button';

class EditAvatar extends Component{

  state = {
    file: '',
    scale: 1,
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_USER_DETAILS`});
  }
  
  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState({file: this.props.reduxState.avatar});
    }
  }

  // Get image from canvas
  handleCanvas = () => {
    const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL('image/png');
    this.props.dispatch({type: `UPDATE_AVATAR`, payload: canvasScaled});
  }

  // Update selected file in local state
  handleFileChange = (e) => {
    this.setState({file: URL.createObjectURL(e.target.files[0])});
  }

  // Set scale of image zoom
  handleZoom = (e) => {
    let scale = parseFloat(e.target.value);
    this.setState({
      scale: scale
    });
  }

  // Save the image from canvas into database
  onClickSave = () => {
    if (this.editor) {
      this.handleCanvas();
      this.pushHistory();
    }
  }

  // Return to user's profile
  pushHistory = () => {
    this.props.history.push('/profile');
  }

  // Set editor for canvas grab
  setEditorRef = (editor) => this.editor = editor;

  render(){
    return(
      <center>
        <div>
          {this.state.file ?
            <>
            <div className="avatar-editor-div">
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={this.state.file}
                  width={250}
                  height={250}
                  border={50}
                  borderRadius={125}
                  color={[0, 0, 0, 0.8]} // RGBA
                  scale={this.state.scale}
                  rotate={0}
                />
                <div>
                  <span>Zoom:</span> 
                  <input 
                    type="range" 
                    step="0.1" 
                    min="1" 
                    max="2" 
                    name="scale" 
                    value={this.state.scale} 
                    onChange={this.handleZoom} 
                  />
                </div>
              </div>
            </>
            :
            <div className="avatar-whitespace"></div>
          }
          <div>
            <label htmlFor="avatar-upload" className="custom-avatar-upload">
              <p className="avatar-browse-btn-txt">BROWSE</p>
            </label>
            <input id="avatar-upload" type="file" onChange={this.handleFileChange} />
          </div>
        </div>
        <div>
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            value="Save"
            onClick={this.onClickSave}
            style={{width:"80%",marginBottom:"50px",backgroundColor:"#bc75ff"}}
          >
            Apply
          </Button>
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.details.userDetails
});

export default connect(putReduxStateOnProps)(EditAvatar);