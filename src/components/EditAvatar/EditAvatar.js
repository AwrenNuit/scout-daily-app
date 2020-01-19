import React, {Component} from 'react';
import {connect} from 'react-redux';
import AvatarEditor from 'react-avatar-editor';

class EditAvatar extends Component{

  state = {
    file: null,
    scale: 0,
  }

  handleFileChange = (e) => {
    this.setState({file: URL.createObjectURL(e.target.files[0])});
  }

  handleZoom = (e) => {
    let scale = parseFloat(e.target.value);
    this.setState({
      scale: scale
    });
  }

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL('image/png');
      this.props.dispatch({type: `POST_IMAGE`, payload: canvasScaled});
      this.props.history.push('/profile');
    }
  }

  setEditorRef = (editor) => this.editor = editor

  render(){
    return(
      <center>
        <div>
          <div>
            {this.state.file ?
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
              </>
              :
              <div className="whitespace"></div>
            }
            <div>
              <label for="file-upload" class="custom-file-upload">
                <p className="browse-btn-txt">BROWSE</p>
              </label>
              <input id="file-upload" type="file" onChange={this.handleFileChange} />
            </div>
          </div>
        </div>
        <div>
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            value="Save"
            onClick={this.onClickSave}
            style={{width:"90%",marginBottom:"10px",backgroundColor:"#bc75ff"}}
          >
            Post it!
          </Button>
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.OBJECT
});

export default connect(putReduxStateOnProps)(EditAvatar);