import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './DailyPrompt.css';

export default function DailyPrompt() {

  const dispatch = useDispatch();
  const prompt = useSelector(state => state.dailyPrompt.prompt);

  // Run on component mount
  useEffect(()=>{
    dispatch({type: `GET_PROMPT`});
  }, []);

  return(
    <>
    <div className="blur-div"></div>
      <h3 className="daily-prompt-heading">Today's Prompt: <b className="daily-prompt">{prompt}</b></h3>
    </>
  );
}