import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class EditThisImage extends Component{

  render(){
    return(
      <center>
        <div>
          <Fab color="secondary" aria-label="edit" style={{position:"relative",float:"right",top:"40px"}}>
            <DeleteForeverIcon />
          </Fab>
          {this.props.reduxState.map(image=>
            <div key={image.id}>
              <div 
                className="img" 
                style={{backgroundImage:`url(https://scout-daily.s3.us-east-2.amazonaws.com/${image.image_url})`,width:"90%",marginBottom:"20px",borderRadius:"20px"}}>
              </div>
            </div>
          )}
        </div>
        <div>
          <TextField 
            id="outlined-basic" 
            label="update caption" 
            variant="outlined" 
            defaultValue={this.props.reduxState.caption}
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
            Save
          </Button>
        </div>
      </center>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisImageReducer
});

export default connect(putReduxStateOnProps)(EditThisImage);