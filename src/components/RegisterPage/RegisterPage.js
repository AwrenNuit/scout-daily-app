import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import './RegisterPage.css';
import TextField from '@material-ui/core/TextField';
import LoginFooter from '../LoginFooter/LoginFooter';

export default function RegisterPage() {

  const dispatch = useCallback(useDispatch());
  const errors = useSelector(state => state.errors);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const letters = /^[A-Za-z]+$/;

  // Handle username input change
  const changeUsername = e => e.target.value.match(letters) ? setUsername(e.target.value) : '';

  // Dispatch new user information to saga, or display error
  const registerUser = e => {
    e.preventDefault();
    if(username && password){
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
        },
      });
    }
    else {
      dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  }

  return (
    <div>
      {errors.registrationMessage && (
        <h2
          className="alert"
          role="alert"
        >
          {errors.registrationMessage}
        </h2>
      )}
      <form className="register-form" onSubmit={registerUser}>
        <center>
          <img src="/images/logo.png" alt="Scout Daily Logo" height="150px"/>
          <h1 className="register-heading">Register</h1>
          <div>

            <TextField
              id="outlined-basic"
              placeholder="username"
              variant="outlined"
              name="username"
              size="small"
              value={username}
              onChange={changeUsername}
              style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
            />

          </div>
          <div>

            <TextField
              id="outlined-basic"
              placeholder="password"
              variant="outlined"
              name="password"
              type="password"
              size="small"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              style={{width:"90%",marginBottom:"20px",backgroundColor:"white"}}
            />

          </div>
          <div>
            <Button 
              variant="contained" 
              color="primary"
              type="submit"
              value="Register"
              style={{width:"90%",marginBottom:"10px",backgroundColor:"#bc75ff"}}
            >
              Register
            </Button>
          </div>
          <hr className="register-hr" />
          <div>
            <Button 
              onClick={() => {dispatch({type: 'SET_TO_LOGIN_MODE'})}}
              style={{textTransform:"lowercase",marginTop:"10px",color:"#EEE"}}
              disableRipple={true}
            >
              cancel
            </Button>
          </div>
        </center>
      </form>
      <LoginFooter />
    </div>
  );
}