import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import './UserDetails.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default function UserDetails() {

  const details = useSelector(state => state.details.userDetails);
  const dispatch = useDispatch();
  const history = useHistory();
  const [bio, setBio] = useState('');
  const [editBio, setEditBio] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState('');

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_USER_DETAILS`});
  }, []);

  // Dispatch bio updates to saga
  const dispatchBio = () => dispatch({type: `UPDATE_BIO`, payload: bio});

  // Dispatch username updates to saga
  const dispatchUsername = () => dispatch({type: `UPDATE_USERNAME`, payload: username});

  // Update user's avatar
  const editAvatar = () => history.push('/edit-avatar');

  // View followed users
  const handleFollowing = () => history.push('/following');

  // Save bio changes to database, turn off edit mode
  const saveBioChange = () => {
  dispatchBio();
  turnOffBioEdit();
  }

  // Save username changes to database, turn off edit mode
  const saveUsernameChange = () => {
    dispatchUsername();
    turnOffUsernameEdit();
  }

  // Turn off conditionally-rendered bio edit
  const turnOffBioEdit = () => setEditBio(false);

  // Turn off conditionally-rendered username edit
  const turnOffUsernameEdit = () => setEditUsername(false);

  return(
    <div className="main-details-container">
        <div key={details.id} className="user-details-container">
          <img 
            className="avatar" 
            onClick={editAvatar} 
            src={details.avatar} 
            alt={details.username} 
          />
          <div className="avatar-fab">
            <AddIcon style={{fontSize:"10px",paddingTop:"5px"}} />
          </div>
          {editUsername && !editBio ? 
            <input 
            onChange={(e)=>setUsername(e.target.value)} 
            onBlur={saveUsernameChange} 
              value={username} 
              style={{gridArea:"username"}}
              autoFocus 
            /> 
            :
            <span 
              className="username" 
              onClick={()=>{
                setUsername(details.username);
                setEditUsername(true);
                }
              }
            >
              {details.username}
            </span>
          }

          {editBio && !editUsername ? 
            <input 
              onChange={(e)=>setBio(e.target.value)} 
              onBlur={saveBioChange} 
              value={bio} 
              maxLength="100"
              autoFocus 
              style={{width:"200px",gridArea:"bio"}}
            /> 
            :
            <span 
              className="bio" 
              onClick={()=>{
                setBio(details.bio);
                setEditBio(true);
                }
              }
            >
              {details.bio}
            </span>
          }
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleFollowing} 
            style={{gridArea:"following",height:"25px",backgroundColor:"#bc75ff"}}
          >
            Following
          </Button>
        </div>
    </div>
  );
}