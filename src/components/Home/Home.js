import React, {Component} from 'react';
import {connect} from 'react-redux';
import DailyPrompt from '../DailyPrompt/DailyPrompt';

class Home extends Component{

  render(){
    return(
      <>
        <DailyPrompt />
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState
});

export default connect(putReduxStateOnProps)(Home);