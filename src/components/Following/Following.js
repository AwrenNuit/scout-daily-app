import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './Following.css';
import NavBar from '../NavBar/NavBar';

export default function Following() {

  const dispatch = useDispatch();
  const history = useHistory();
  const avatar = useSelector(state => state.following.followingAvatar);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_FOLLOWING`});
  }, []);

  // View selected user's profile
  const handleClick = id => {
    history.push(`/profile/${id}`);
  }

  return(
    <>
      <h2 className="heading-2">Following</h2>
      {avatar ?
        <div className="following-main-flex" >
          {avatar.map(image =>
            <div className="following-col" key={image.id}>
              <img 
                className="following-avatar" 
                onClick={()=>handleClick(image.id)} 
                src={image.avatar} 
                alt={image.username} 
              />
              <div>{image.username}</div>
            </div>
          )}
        </div>
        :
        <p>Not following anyone</p>
      }
      <div className="bottom-whitespace"></div>
      <NavBar />
    </>
  );
}