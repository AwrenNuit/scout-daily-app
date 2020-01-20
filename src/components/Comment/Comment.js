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
      {/* {JSON.stringify(this.props.reduxState)} */}
        {this.props.reduxState.map(comment =>
          <div>
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