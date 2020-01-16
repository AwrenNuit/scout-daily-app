// Store daily prompt
const dailyPromptReducer = (state=[], action) => {
  if(action.type === `SET_PROMPT`){
    return action.payload;
  }
  return state;
}

export default dailyPromptReducer;