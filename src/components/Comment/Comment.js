import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Comment.css';

class Comment extends Component{

  componentDidMount(){
    this.props.dispatch({type: `VIEW_THIS_IMAGE`, payload: this.props.params_id});
  }

  render(){
    return(
      <>
        {this.props.reduxState.map(comment =>
          <div key={comment.id}>
            <img className="comment-avatar" src={comment.avatar} alt={comment.username} />
            <span>{comment.username}</span>
            <div>{comment.comment}</div>
          </div>
        )}
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.comment
});

export default connect(putReduxStateOnProps)(Comment);