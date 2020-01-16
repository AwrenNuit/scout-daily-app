import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PostImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../ImageUpload/ImageUpload';
import NavBar from '../NavBar/NavBar';
import AvatarEditor from 'react-avatar-editor';
// import axios from 'axios';

class PostImage extends Component{

  state = {
    caption: '',
    file: null,
    scale: 0,
    // image: ''
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

  onClickSave = () => {
    if (this.editor) {
      const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL('image/png');
      this.props.dispatch({type: `SEND`, payload: canvasScaled});
      // let qwert = this.dataURItoBlob(canvasScaled);
      // console.log(qwert);
      // this.setState({image: canvasScaled});
      // axios.post(`/test-upload`, {data: canvasScaled})
      // .then(response => {
      //   // handle your response;
      // }).catch(error => {
      //   // handle your error
      // });
    }
  }

//   dataURItoBlob = (dataURI) => {
//     var binary = atob(dataURI.split(',')[1]);
//     var array = [];
//     for(var i = 0; i < binary.length; i++) {
//         array.push(binary.charCodeAt(i));
//     }
//     return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
// }

  // db = () => {
    // this.props.dispatch({type: `SEND`, payload: canvasScaled});
  // }

  setEditorRef = (editor) => this.editor = editor

  render(){
    return(
      <center>
        {JSON.stringify(this.state)}
        <div>
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
            <button onClick={this.onClickSave}>SAVE</button>
            {/* <img src={this.state.image} alt="test" /> */}
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
            onClick={this.db}
            style={{width:"90%",marginBottom:"10px"}}
          >
            Post it!
          </Button>
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </center>
    );
  }
}

export default connect()(PostImage);