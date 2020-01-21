import React, {Component} from 'react';
import DailyPrompt from '../DailyPrompt/DailyPrompt';
import NavBar from '../NavBar/NavBar';
import ImageFeed from '../ImageFeed/ImageFeed';
import LogOutButton from '../LogOutButton/LogOutButton';

class Home extends Component{

  render(){
    return(
      <>
        <DailyPrompt />
        <ImageFeed />
        <NavBar history={this.props.history.location.pathname} />
      </>
    );
  }
}

export default Home;