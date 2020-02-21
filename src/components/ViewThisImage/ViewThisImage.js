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
  const image = useSelector(state => state.image.viewThisImage);
  const [like, setLike] = useState(false);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `VIEW_THIS_IMAGE`, payload: match.id});
    dispatch({type: `GET_LIKE`, payload: match.id});
  }, [dispatch, match.id]);

  // Dispatch like to saga
  const handleLike = imageID => {
    if(!like){
      setLike(true);
      dispatch({type: `ADD_LIKE`, payload: imageID});
    }
    else {
      setLike(false);
      dispatch({type: `SUB_LIKE`, payload: imageID});
    }
  }

  return(
    <>
      <div className="view-card">
        <div>
          <Link to={"/profile/"+image.user_id}>
            <img className="view-avatar" src={image.avatar} alt={image.username} />
            <span className="view-username">{image.username}</span>
          </Link>
        </div>
        <span>
          <center>
            <img className="view-img" src={image.image_url} alt={image.caption} />
          </center>
          <div>
            {like ?
              <FavoriteIcon 
                onClick={()=>handleLike(image.id)} 
                style={{marginLeft:"40px",cursor:"pointer",color:"#b50000"}}
              />
              :
              <FavoriteBorderIcon 
                onClick={()=>handleLike(image.id)} 
                style={{marginLeft:"40px",cursor:"pointer"}}
              />
            }
            <span className="view-likes">{image.likes} likes</span>
          </div>
          <div className="view-caption">{image.caption}</div>
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