import React from 'react';
import {useHistory} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import RenderUserImage from '../RenderUserImage/RenderUserImage';
import UserDetails from '../UserDetails/UserDetails';

export default function Profile() {

  const history = useHistory();

  return(
    <>
      <UserDetails />
      <RenderUserImage />
      <NavBar history={history.location.pathname} />
    </>
  );
}