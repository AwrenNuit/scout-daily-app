import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EditAvatar.css';
import AvatarEditor from 'react-avatar-editor';
import NavBar from '../NavBar/NavBar';
import Button from '@material-ui/core/Button';

class EditAvatar extends Component{

  state = {
    file: null,
    scale: 1,
  }

  UNSAFE_componentWillMount(){
    this.props.dispatch({type: `GET_USER_DETAILS`});
  }
  
  componentDidMount(){
    this.setState({file: this.props.reduxState.avatar});
  }

  handleCanvas = () => {
    const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL('image/png');
    this.setState({file:canvasScaled});
    // this.props.dispatch({type: `UPDATE_AVATAR`, payload: canvasScaled});
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
      // this.handleCanvas();
      // this.pushHistory();
    }
  }

  pushHistory = () => {
    this.props.history.push('/profile');
  }

  setEditorRef = (editor) => this.editor = editor;

  render(){
    return(
      <center>
        {JSON.stringify(this.state)}
        <div>
          {this.state.file ?
            <>
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.file}
                width={250}
                height={250}
                border={50}
                // borderRadius={125}
                color={[0, 0, 0, 0.8]} // RGBA
                scale={this.state.scale}
                rotate={0}
              />
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
            </>
            :
            <div className="whitespace"></div>
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
            style={{width:"90%",marginBottom:"10px",backgroundColor:"#bc75ff"}}
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
  reduxState: reduxState.userDetails
});

export default connect(putReduxStateOnProps)(EditAvatar);