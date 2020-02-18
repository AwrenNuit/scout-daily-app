import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './OtherUserDetails.css';
import Button from '@material-ui/core/Button';

export default function OtherUserDetails(props) {

  const dispatch = useCallback(useDispatch());
  const otherUser = useSelector(state => state.otherUserDetails);
  const existingFollow = useSelector(state => state.followingDetails);
  const user = useSelector(state => state.user);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_OTHER_USER_DETAILS`, payload: props.id});
    dispatch({type: `GET_FOLLOWING DETAILS`});
  }, [dispatch, props.id]);

  // Checks if current user is following this user, conditionally renders follow/unfollow button based on result
  const seeIfFollowing = () => {
    let details = [];
    let id = otherUser.id;
    for(let num of existingFollow){
      details.push(num.connection_id);
    }
    if(details.includes(id)){
      return true;
    }
    return false;
  }

  // Either follows or unfollows
  const handleFollow = id => {
    let details = [];
    for(let num of existingFollow){
      details.push(num.connection_id);
    }
    if(!details.includes(id)){
      dispatch({type: `ADD_FOLLOW`, payload: id});
    }
    else if(details.includes(id)){
      dispatch({type: `REMOVE_FOLLOW`, payload: id});
    }
  }

  return(
    <div className="main-details-container">
         <div key={otherUser.id} className="other-user-details-container">
           <img className="avatar" src={otherUser.avatar} alt={otherUser.username} />
           <span className="username">{otherUser.username}</span>
           <span className="bio">{otherUser.bio}</span>
          {user ?
            <Button 
              variant="contained" 
              color="primary" 
              onClick={()=>handleFollow(otherUser.id)} 
              style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}
            >
              {seeIfFollowing() ? 'Unfollow' : 'Follow'}
            </Button>
            :
            <Button 
              variant="contained" 
              color="primary" 
              style={{gridArea:"follow",height:"25px",backgroundColor:"#bc75ff"}}
            >
              Log in to follow
            </Button>
          }
         </div>
    </div>
  );
}