import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './EditAvatar.css';
import AvatarEditor from 'react-avatar-editor';
import NavBar from '../NavBar/NavBar';
import Button from '@material-ui/core/Button';

export default function EditAvatar() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const [editor, setEditor] = useState('');
  const [file, setFile] = useState('');
  const [scale, setScale] = useState(1);
  const userDetails = useSelector(state => state.details.userDetails);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_USER_DETAILS`});
  }, []);

  // Set file on update
  useEffect(()=>{
    setFile(userDetails.avatar);
  }, [setFile]);

  // Get image from canvas
  const handleCanvas = () => {
    const canvasScaled = editor.getImageScaledToCanvas().toDataURL('image/png');
    dispatch({type: `UPDATE_AVATAR`, payload: canvasScaled});
  }

  // Set scale of image zoom
  const handleZoom = e => {
    let scale = parseFloat(e.target.value);
    setScale(scale);
  }

  // Save the image from canvas into database
  const onClickSave = () => {
    if(editor) {
      handleCanvas();
      pushHistory();
    }
  }

  // Return to user's profile
  const pushHistory = () => history.push('/profile');

  // Set editor for canvas grab
  const setEditorRef = edit => setEditor(edit);

  return(
    <center>
      <div>
        {file ?
          <>
          <div className="avatar-editor-div">
              <AvatarEditor
                ref={setEditorRef}
                image={file}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
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
          <div className="avatar-whitespace"></div>
        }
        <div>
          <label htmlFor="avatar-upload" className="custom-avatar-upload">
            <p className="avatar-browse-btn-txt">BROWSE</p>
          </label>
          <input id="avatar-upload" type="file" onChange={(e)=>setFile(URL.createObjectURL(e.target.files[0]))} /> 
        </div>
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
          Apply
        </Button>
      </div>
      <NavBar history={history.location.pathname} />
    </center>
  );
}