import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RenderImageFeed from '../RenderImageFeed/RenderImageFeed';

export default function ImageFeed() {

  const dispatch = useDispatch();
  const image = useSelector(state => state.image.imageFeed);

  useEffect(()=>{
    dispatch({type: `GET_IMAGE_FEED`});
  }, []);

  return(
    <>
      {image ? 
        image.map(image=>
          <div key={image.id}>
            <RenderImageFeed image={image} />
          </div>
        ) 
        : 
        <p>Follow someone</p>
      }
      <div className="bottom-whitespace"></div>
    </>
  );
}