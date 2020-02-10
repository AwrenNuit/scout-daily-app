import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './RenderUserImage.css';

export default function RenderUserImage() {

  const dispatch = useDispatch();
  const image = useSelector(state => state.image.allUserImage);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_ALL_USER_IMAGE`});
  }, []);

  return(
    <div>
      {image ? 
        image.map(image =>
          <span key={image.id}>
            <Link to={"/edit-photo/"+image.id}>
              <img className="user-img" src={image.image_url} alt={image.description} />
            </Link>
          </span>
        )
        :
        <p>Add some pics! :)</p>
      }
      <div className="bottom-whitespace"></div>
    </div>
  );
}