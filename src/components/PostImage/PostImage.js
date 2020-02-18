import React, { useCallback, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PostImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import NavBar from '../NavBar/NavBar';
import AvatarEditor from 'react-avatar-editor';

export default function PostImage() {

  const dispatch = useCallback(useDispatch());
  const editorRef = useRef(null);
  const history = useHistory();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [scale, setScale] = useState(1);

  // Get image from canvas
  const handleCanvas = () => {
    const canvasScaled = editorRef.current.getImageScaledToCanvas().toDataURL('image/png');
    dispatch({type: `POST_IMAGE`, payload: {image: canvasScaled, caption: caption}});
  }

  // Set scale of image zoom
   const handleZoom = e => {
    let newScale = parseFloat(e.target.value);
    setScale(newScale);
  }

  // Save the image from canvas into database
  const onClickSave = () => {
    if(editorRef) {
      handleCanvas();
      pushHistory();
    }
  }

  // Return to user's profile
  const pushHistory = () => history.push('/profile');

  return(
    <center>
      <div>
        {file ?
          <>
            <div className="avatar-editor-div">
              <AvatarEditor
                ref={editorRef}
                image={file}
                width={250}
                height={250}
                border={50}
                color={[0, 0, 0, 0.8]} // RGBA
                scale={scale}
                rotate={0}
              />
              <div>
                <span>Zoom:</span> 
                <input 
                  type="range" 
                  step="0.1" 
                  min="1" 
                  max="2" 
                  name="scale" 
                  value={scale} 
                  onChange={handleZoom} 
                />
              </div>
            </div>
          </>
          :
          <div className="img-whitespace"></div>
        }
        <div>
          <label htmlFor="file-upload" className="custom-file-upload">
            <p className="browse-btn-txt">BROWSE</p>
          </label>
          <input id="file-upload" type="file" onChange={(e)=>setFile(URL.createObjectURL(e.target.files[0]))} />
        </div>
      </div>
      <div>
        <TextField 
          id="outlined-basic" 
          placeholder="enter caption" 
          variant="outlined"
          onChange={(e)=>setCaption(e.target.value)} 
          value={caption}
          multiline 
          style={{width:"80%",marginBottom:"20px"}} 
        />
      </div>
      <div>
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          value="Save"
          onClick={onClickSave}
          style={{width:"80%",marginBottom:"50px",backgroundColor:"#bc75ff"}}
        >
          Post it!
        </Button>
      </div>
      <NavBar history={history.location.pathname} />
    </center>
  );
}