import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function LikeFeedImage(props) {

  const dispatch = useCallback(useDispatch());
  const [like, setLike] = useState(false);

  // Run on component mount
  useEffect(()=>{
    setLike(props.image.liked);
  }, [setLike, props.image.liked]);

  // Dispatch like to saga, toggle like state
  const handleLike = imageID => {
    if(!like){
      setLike(true);
      dispatch({type: `ADD_FEED_LIKE`, payload: imageID});
    }
    else {
      setLike(false);
      dispatch({type: `SUB_FEED_LIKE`, payload: imageID});
    }
  }

  return(
    <>
            {JSON.stringify(like)}

      {like ?
        <FavoriteIcon 
          onClick={()=>handleLike(props.image.id)} 
          style={{marginLeft:"40px",cursor:"pointer",color:"#b50000"}}
        />
        :
        <FavoriteBorderIcon 
          onClick={()=>handleLike(props.image.id)} 
          style={{marginLeft:"40px",cursor:"pointer"}}
        />
      }
    </>
  );
}