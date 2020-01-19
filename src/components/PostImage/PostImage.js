import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './PostImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavBar from '../NavBar/NavBar';
import AvatarEditor from 'react-avatar-editor';

const styles = ({
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: '3px',
      borderColor: `#bc75ff !important`,
    }
  },
  cssFocused: {},
  notchedOutline: {},
});

class PostImage extends Component{

  state = {
    caption: '',
    file: null,
    scale: 1,
  }

  handleCanvas = () => {
    const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL('image/png');
    this.props.dispatch({type: `POST_IMAGE`, payload: {image: canvasScaled, caption: this.state.caption}});
  }

  handleCaptionChange = (e) => {
    this.setState({caption: e.target.value});
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
      this.handleCanvas();
      this.pushHistory();
    }
  }

  pushHistory = () => {
    this.props.history.push('/profile');
  }

  setEditorRef = (editor) => this.editor = editor;

  render(){
    const { classes } = this.props;

    return(
      <center>
        <div>
          {this.state.file ?
            <>
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.file}
                width={250}
                height={250}
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
            <label htmlFor="file-upload" className="custom-file-upload">
              <p className="browse-btn-txt">BROWSE</p>
            </label>
            <input id="file-upload" type="file" onChange={this.handleFileChange} />
          </div>
        </div>
        <div>
          <TextField 
            id="outlined-basic" 
            placeholder="enter caption" 
            variant="outlined"
            onChange={this.handleCaptionChange} 
            value={this.state.caption}
            multiline 
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              }
            }}
            style={{width:"90%",marginBottom:"20px"}} 
          />
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

PostImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect()(PostImage));