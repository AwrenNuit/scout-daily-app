import React from 'react';
import {useHistory} from 'react-router-dom';
import DailyPrompt from '../DailyPrompt/DailyPrompt';
import NavBar from '../NavBar/NavBar';
import ImageFeed from '../ImageFeed/ImageFeed';
import LogOutButton from '../LogOutButton/LogOutButton';

export default function Home() {

  const history = useHistory();

  return(
    <>
      <LogOutButton />
      <DailyPrompt />
      <ImageFeed />
      <NavBar history={history.location.pathname} />
    </>
  );
}