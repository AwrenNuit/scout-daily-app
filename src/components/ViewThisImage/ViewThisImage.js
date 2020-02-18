import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import './ViewThisImage.css';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NavBar from '../NavBar/NavBar';
import Comment from '../Comment/Comment';

export default function ViewThisImage() {

  const dispatch = useCallback(useDispatch());
  const match = useParams();
  const image = useSelector(state => state.viewThisImage);
  const imageLike = useSelector(state => state.like);
  const details = useSelector(state => state.user);
  const [like, setLike] = useState(false);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `VIEW_THIS_IMAGE`, payload: match.id});
    dispatch({type: `GET_LIKE`, payload: match.id});
  }, [dispatch]);

  // Run on like change
  useEffect(()=>{
    if(imageLike.like !== true){
      setLike(false);
    }
    else {
      setLike(true);
    }
  }, [like]);

  // Dispatch like to saga
  const handleLike = image => !like ? dispatch({type: `ADD_LIKE`, payload: image}) : dispatch({type: `SUB_LIKE`, payload: image});

  return(
    <>
      <div className="view-card">
        <div>
          <Link to={"/profile/"+details.user_id}>
            <img className="view-avatar" src={details.avatar} alt={details.username} />
            <span className="view-username">{details.username}</span>
          </Link>
        </div>
        <span>
          <center>
            <img className="view-img" src={details.image_url} alt={details.caption} />
          </center>
          <div>
            {like ?
              <FavoriteIcon 
                onClick={()=>handleLike(details.id)} 
                style={{marginLeft:"40px",cursor:"pointer",color:"#b50000"}}
              />
              :
              <FavoriteBorderIcon 
                onClick={()=>handleLike(details.id)} 
                style={{marginLeft:"40px",cursor:"pointer"}}
              />
            }
            <span className="view-likes">{details.likes} likes</span>
          </div>
          <div className="view-caption">{details.caption}</div>
        </span>
      </div>
      <div className="comment-div">
        <hr className="view-hr" />
        <Comment params_id={match.id} />
      </div>
      <div className="bottom-whitespace"></div>
      <NavBar />
    </>
  );
}