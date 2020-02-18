import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditThisImage.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NavBar from '../NavBar/NavBar';

export default function EditThisImage() {

  const dispatch = useCallback(useDispatch());
  const history = useHistory();
  const match = useParams();
  const image = useSelector(state => state.image.thisImage);
  const [caption, setCaption] = useState('');
  const [id, setId] = useState('');

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_THIS_IMAGE`, payload: match.id});
  }, [dispatch, match.id]);

  // Run when image caption or id change
  useEffect(()=>{
    if(image){
    setCaption(image.caption);
    setId(image.id);
    }
  }, [image]);

  // Dispatch caption updates to saga
  const dispatchCaption = () => dispatch({type: `UPDATE_CAPTION`, payload: {caption: caption, id: id}});

  // Permanently deletes this image
  const handleDelete = () => {
    let popup = window.confirm(`Delete this image?`);
    if(popup){
      dispatch({type: `DELETE_IMAGE`, payload: id});
      pushHistory();
    }
  }

  // Save changes to database, returns user to their profile
  const handleSave = () => {
    dispatchCaption();
    pushHistory();
  }

  // View user's profile
  const pushHistory = () => history.push('/profile');

  return(
    <>
      <center>
        <div>
          <Fab 
            color="secondary" 
            aria-label="edit" 
            onClick={handleDelete}
            style={{position:"relative",top:"30px",left:"147px"}}
          >
            <DeleteForeverIcon />
          </Fab>
          <div>
          <img className="img" src={image.image_url} alt={image.description} />
          </div>
        </div>
        </center>
      <div className="edit-center-input">
        <TextField 
          id="outlined-basic" 
          label="update caption" 
          variant="outlined" 
          value={caption || ''}
          onChange={(e)=>setCaption(e.target.value)}
          multiline 
          style={{width:"80%",marginBottom:"20px"}} 
        />
        <Button 
          variant="contained" 
          color="primary"
          type="submit"
          value="Save"
          onClick={handleSave}
          style={{width:"80%",marginBottom:"50px",backgroundColor:"#bc75ff"}}
        >
          Save
        </Button>
      </div>
      <NavBar />
    </>
  );
}