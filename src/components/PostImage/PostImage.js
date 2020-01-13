import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ImageUpload from '../ImageUpload/ImageUpload';
import RenderImage from '../RenderImage/RenderImage';
class PostImage extends Component{

  render(){
    return(
      <>
        <div>
          <ImageUpload />
          <RenderImage />
        </div>
        <div>
          <TextField id="outlined-basic" label="enter caption" variant="outlined" multiline style={{width:"90%",marginBottom:"20px"}} />
        </div>
        <div>
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
            value="Save"
            style={{width:"90%",marginBottom:"10px"}}
          >
            Post
          </Button>
        </div>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.dailyPrompt
});

export default connect(putReduxStateOnProps)(PostImage);