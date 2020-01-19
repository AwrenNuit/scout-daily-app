import React, {Component} from 'react';
import {connect} from 'react-redux';
import './EditThisImage.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NavBar from '../NavBar/NavBar';

const styles = ({
  cssLabel: {
    '&$cssFocused': {
      color: '#bc75ff',
    }
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: '3px',
      borderColor: `#bc75ff !important`,
    }
  },
  cssFocused: {},
  notchedOutline: {},
});

class EditThisImage extends Component{

  state = {
    caption: '',
    id: ''
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_IMAGE`, payload: this.props.match.params.id});
  }

  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState({
        caption: this.props.reduxState.caption,
        id: this.props.reduxState.id
      });
    }
  }

  handleChange = (e) => {
    this.setState({caption: e.target.value});
  }

  handleDelete = () => {
    let popup = window.confirm(`Delete this image?`);
    if(popup){
      this.props.dispatch({type: `DELETE_IMAGE`, payload: this.state.id});
      this.props.history.push('/profile');
    }
  }

  handleSave = () => {
    this.props.dispatch({type: `UPDATE_CAPTION`, payload: {caption: this.state.caption, id: this.state.id}});
    this.props.history.push('/profile');
  }

  render(){
    const { classes } = this.props;

    return(
      <>
        <center>
          <div>
            <Fab 
              color="secondary" 
              aria-label="edit" 
              onClick={this.handleDelete}
              style={{position:"relative",top:"30px",left:"147px"}}
            >
              <DeleteForeverIcon />
            </Fab>
            <div>
            <img className="img" src={this.props.reduxState.image_url} alt={this.props.reduxState.description} />
            </div>
          </div>
          <div>
            <TextField 
              id="outlined-basic" 
              label="update caption" 
              variant="outlined" 
              value={this.state.caption || ''}
              onChange={this.handleChange}
              multiline 
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                }
              }}
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
              onClick={this.handleSave}
              style={{width:"90%",marginBottom:"50px",backgroundColor:"#bc75ff"}}
            >
              Save
            </Button>
          </div>
        </center>
        <NavBar />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisImage
});

EditThisImage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(putReduxStateOnProps)(EditThisImage));