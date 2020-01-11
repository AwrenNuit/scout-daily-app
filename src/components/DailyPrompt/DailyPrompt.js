import React, {Component} from 'react';
import {connect} from 'react-redux';

class DailyPrompt extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_PROMPT`});
  }

  render(){
    return(
      <>
        <h1>Today's Prompt: ${this.props.reduxState}</h1>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.dailyPromptReducer
});

export default connect(putReduxStateOnProps)(DailyPrompt);