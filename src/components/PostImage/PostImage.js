import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PostImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../ImageUpload/ImageUpload';
import NavBar from '../NavBar/NavBar';
import AvatarEditor from 'react-avatar-editor';

class PostImage extends Component{

  state = {
    caption: '',
    file: null,
    scale: 0
  }

  handleCaptionChange = (e) => {
    this.setState({caption: e.target.value});
  }

  handleFileChange = (event) => {
    this.setState({file: URL.createObjectURL(event.target.files[0])});
  }

  handleZoom = (e) => {
    let scale = parseFloat(e.target.value);
    this.setState({
      scale: scale
    });
  }

  render(){
    return(
      <center>
        <div>
          <div>
            {this.state.file ?
              <>
                <AvatarEditor
                  image={this.state.file}
                  width={250}
                  height={250}
                  border={50}
                  color={[20, 20, 20, 0.8]} // RGBA
                  scale={this.state.scale || 1}
                  rotate={0}
                />
                <span>Zoom:</span> 
                <input type="range" step="0.1" min="1" max="2" name="scale" value={this.state.scale} onChange={this.handleZoom} />
              </>
              :
              <div className="whitespace"></div>
            }
            <input type="file" onChange={this.handleFileChange}/>
          </div>
        </div>
        <div>
          <TextField 
            id="outlined-basic" 
            label="enter caption" 
            variant="outlined"
            onChange={this.handleCaptionChange} 
            value={this.state.caption}
            multiline 
            style={{width:"90%",marginBottom:"20px"}} 
          />
        </div>
        <div>
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            value="Save"
            style={{width:"90%",marginBottom:"10px"}}
          >
            Post Image
          </Button>

          <ImageUpload caption={this.state.caption} />
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </center>
    );
  }
}

export default connect()(PostImage);