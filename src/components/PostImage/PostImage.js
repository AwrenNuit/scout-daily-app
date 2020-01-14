import React, {Component} from 'react';
import {connect} from 'react-redux';
import './PostImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../ImageUpload/ImageUpload';
import NavBar from '../NavBar/NavBar';

class PostImage extends Component{

  state = {
    file: null,
    caption: ''
  }

  handleCaptionChange = (e) => {
    this.setState({caption: e.target.value});
  }

  handleFileChange = (event) => {
    this.setState({file: URL.createObjectURL(event.target.files[0])});
  }

  render(){
    return(
      <center>
        <div>
          <div>
            <img className="add-image-preview" src={this.state.file}/>
            <input type="file" onChange={this.handleFileChange}/>
          </div>
          {/* <ImageUpload caption={this.state.caption} /> */}
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
        </div>
        <NavBar history={this.props.history.location.pathname} />
      </center>
    );
  }
}

export default connect()(PostImage);