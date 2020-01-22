import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Comment.css';
import { TextField, Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

class Comment extends Component{

  state = {
    comment: ''
  }

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.params_id});
  }

  // Dispatch comment to saga
  dispatchComment = () => {
    this.props.dispatch({type: `POST_COMMENT`, payload: {id: this.props.params_id, comment: this.state.comment}});
  }

  // Update local state with input value
  handleCommentChange = (e) => {
    this.setState({comment: e.target.value});
  }

  // Delete this comment
  handleDelete = (comment_id, image_id) => {
    this.props.dispatch({type: `DELETE_COMMENT`, payload: {comment_id: comment_id, image_id: image_id}});
  }

  // Dispatch comment, reset local state
  postComment = () => {
    this.dispatchComment();
    this.resetState();
  }

  // Clear local state
  resetState = () => {
    this.setState({comment: ''});
  }

  render(){
    const { classes } = this.props;

    return(
      <>
        {this.props.reduxState.map(comment =>
          <div key={comment.id}>
            <img className="comment-avatar" src={comment.avatar} alt={comment.username} />
            <span className="comment-username">{comment.username}</span>
            {this.props.user.username === comment.username ?
              <Fab 
                color="secondary" 
                aria-label="edit" 
                onClick={()=>this.handleDelete(comment.id, comment.image_id)}
                style={{position:"relative",top:"-50px",left:"155px",height:"20px",width:"40px"}}
              >
                <DeleteForeverIcon />
              </Fab>
              :
              ''
            }
            <div className="comment-comment">{comment.comment}</div>
            <hr className="comment-hr" />
          </div>
        )}
        {this.props.user.id ?
          <center>
            <TextField
              id="outlined-basic" 
              label="add comment" 
              variant="outlined"
              onChange={this.handleCommentChange} 
              value={this.state.comment}
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
              style={{width:"70%",marginBottom:"20px"}}
            />
            <Button
              variant="contained" 
              color="primary"
              onClick={this.postComment}
              style={{position:"relative",height:"55px",width:"20%",backgroundColor:"#bc75ff"}}
            >
              POST
            </Button>
          </center>
          :
          ''
        }
        
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.comment,
  user: reduxState.user
});

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(putReduxStateOnProps)(Comment));