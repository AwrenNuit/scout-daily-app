import React, {Component} from 'react';
import DailyPrompt from '../DailyPrompt/DailyPrompt';
import NavBar from '../NavBar/NavBar';
import RenderImageFeed from '../RenderImageFeed/RenderImageFeed';

class Home extends Component{

  render(){
    return(
      <>
        <DailyPrompt />
        <RenderImageFeed />
        <NavBar history={this.props.history.location.pathname} />
      </>
    );
  }
}

export default Home;