import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './RenderOtherUserImage.css';

export default function RenderUserImage(props) {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const image = useSelector(state => state.image.allOtherUserImage);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_ALL_OTHER_USER_IMAGE`, payload: props.id});
  }, [dispatch]);

  //Push history to view this image
  const pushHistory = id => history.push(`/view-image/${id}`);

  return(
    <div>
      {image ? 
        image.map(image=>
          <span key={image.id}>
              <img 
                className="other-user-img" 
                src={image.image_url} 
                alt={image.description} 
                onClick={()=>pushHistory(image.id)} 
              />
          </span>
        )
        :
        <p>No posts yet</p>
      }
      <div className="bottom-whitespace"></div>
    </div>
  );
}