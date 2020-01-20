import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './Comment.css';
import { TextField } from '@material-ui/core';

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

  handleCommentChange = (e) => {
    this.setState({comment: e.target.value});
  }

  postComment = () => {
    this.props.dispatch({type: `POST_COMMENT`, payload: {id: this.props.params_id, comment: this.state.comment}});
    this.setState({comment: ''});
  }

  render(){
    const { classes } = this.props;

    return(
      <>
      {JSON.stringify(this.state)}
        {this.props.reduxState.map(comment =>
          <div key={comment.id}>
            <img className="comment-avatar" src={comment.avatar} alt={comment.username} />
            <span className="comment-username">{comment.username}</span>
            <div className="comment-comment">{comment.comment}</div>
            <hr className="comment-hr" />
          </div>
        )}
        <center>
          <TextField
            id="outlined-basic" 
            label="add comment" 
            variant="outlined"
            onBlur={this.postComment}
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
            style={{width:"90%",marginBottom:"20px"}}
          />
        </center>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.comment
});

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(putReduxStateOnProps)(Comment));