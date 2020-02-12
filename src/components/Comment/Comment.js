import React, {useState, useEffect, useCallback} from 'react';
import './Comment.css';
import { TextField, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from 'react-redux';

export default function Comment(props) {

  const [comment, setComment] = useState('');
  const dispatch = useCallback(useDispatch());
  const existingComment = useSelector(state => state.comment);
  const user = useSelector(state => state.user);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `VIEW_THIS_IMAGE`, payload: props.params_id});
  }, []);

  // Dispatch comment to saga
  const dispatchComment = () => dispatch({type: `POST_COMMENT`, payload: {id: props.params_id, comment: comment}});

  // Delete this comment
  const handleDelete = (comment_id, image_id) => {
    let popup = window.confirm(`Delete this comment?`);
    if(popup){
      dispatch({type: `DELETE_COMMENT`, payload: {comment_id: comment_id, image_id: image_id}});
    }
  }

  // Dispatch comment, reset local state
  const postComment = () => {
    dispatchComment();
    setComment('');
  }

  return(
    <>
      {existingComment.map(comment =>
        <div key={comment.id}>
          <img className="comment-avatar" src={comment.avatar} alt={comment.username} />
          <span className="comment-username">{comment.username}</span>
          {user.username === comment.username ?
              <ClearIcon 
                onClick={()=>handleDelete(comment.id, comment.image_id)}
                style={{position:"relative",top:"-45px",left:"175px",height:"20px",width:"40px",cursor:"pointer"}}
              />
            :
            ''
          }
          <div className="comment-comment">{comment.comment}</div>
          <hr className="comment-hr" />
        </div>
      )}
      {user.id ?
        <div className="comment-center-input">
          <TextField
            id="outlined-basic" 
            label="add comment" 
            variant="outlined"
            onChange={(e)=>setComment(e.target.value)} 
            value={comment}
            multiline 
            style={{width:"70%",marginBottom:"20px",marginTop:"10px"}}
          />
          <Button
            variant="contained" 
            color="primary"
            onClick={postComment}
            style={{position:"relative",height:"53px",width:"20%",backgroundColor:"#bc75ff",marginTop:"12px"}}
          >
            POST
          </Button>
        </div>
        :
        ''
      }
    </>
  );
}