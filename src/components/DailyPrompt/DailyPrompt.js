import React, {Component} from 'react';
import {connect} from 'react-redux';

class DailyPrompt extends Component{

  componentDidMount(){
    console.log('in didMount');
    this.props.dispatch({type: `GET_PROMPT`});
  }

  render(){
    return(
      <>
        <h1>Today's Prompt: 
          {this.props.reduxState.map(prompt=>
            <span> {prompt.prompt}</span>
          )}
        </h1>
      </>
    );
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.dailyPrompt
});

export default connect(putReduxStateOnProps)(DailyPrompt);