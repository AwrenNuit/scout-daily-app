import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DailyPrompt.css';

class DailyPrompt extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_PROMPT`});
  }

  render(){
    return(
      <>
      <div className="blur-div"></div>
        <h3 className="daily-prompt-heading">Today's Prompt: <b className="daily-prompt">{this.props.reduxState.prompt}</b></h3>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.dailyPrompt
});

export default connect(putReduxStateOnProps)(DailyPrompt);