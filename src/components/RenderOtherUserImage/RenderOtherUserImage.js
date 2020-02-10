import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './RenderOtherUserImage.css';

export default function RenderUserImage(props) {

  const dispatch = useDispatch();
  const image = useSelector(state => state.image.allOtherUserImage);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_ALL_OTHER_USER_IMAGE`, payload: props.id});
  }, []);

  return(
    <div>
      {image ? 
        image.map(image=>
          <span key={image.id}>
            <Link to={"/view-image/"+image.id}>
              <img className="other-user-img" src={image.image_url} alt={image.description} />
            </Link>
          </span>
        )
        :
        <p>No posts yet</p>
      }
      <div className="bottom-whitespace"></div>
    </div>
  );
}