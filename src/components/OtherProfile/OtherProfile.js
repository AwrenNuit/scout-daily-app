import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import RenderOtherUserImage from '../RenderOtherUserImage/RenderOtherUserImage';
import OtherUserDetails from '../OtherUserDetails/OtherUserDetails';

export default function OtherProfile() {

  const history = useHistory();
  const match = useParams();

  return(
    <>
      <OtherUserDetails id={match.id} />
      <RenderOtherUserImage id={match.id} />
      <NavBar history={history.location.pathname} />
    </>
  );
}