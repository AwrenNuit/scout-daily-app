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
        {/* {this.props.reduxState.map(image=> */}
          <div>
            <Fab color="secondary" aria-label="edit" style={{position:"relative",float:"right",top:"40px"}}>
              <DeleteForeverIcon />
            </Fab>
            <img src="https://image.shutterstock.com/image-photo/mountains-during-sunset-beautiful-natural-260nw-407021107.jpg" alt="pic" style={{width:"90%",marginBottom:"20px",borderRadius:"20px"}} />
            {/* <div className="img" style={{backgroundImage:`url(https://prime-solo-test.s3.us-east-2.amazonaws.com/${image.image_url})`}}></div> */}
          </div>
        {/* )} */}
        <div>
          <TextField id="outlined-basic" label="existing caption" variant="outlined" multiline style={{width:"90%",marginBottom:"20px"}} />
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
  reduxState: reduxState.dailyPrompt
});

export default connect(putReduxStateOnProps)(EditThisImage);