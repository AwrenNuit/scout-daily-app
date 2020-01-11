// Store daily prompt
const dailyPromptReducer = (state=[], action) => {
  if(action.type === `SET_PROMPT`){
    console.log('in reducer');
    return action.payload;
  }
  return state;
}

export default dailyPromptReducer;