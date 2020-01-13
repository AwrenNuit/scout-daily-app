import React, {Component} from 'react';
import DailyPrompt from '../DailyPrompt/DailyPrompt';
import NavBar from '../NavBar/NavBar';
import RenderAllImage from '../RenderAllImage/RenderAllImage';

class Home extends Component{

  render(){
    return(
      <>
        <DailyPrompt />
        <RenderAllImage />
        <NavBar />
      </>
    );
  }
}

export default Home;