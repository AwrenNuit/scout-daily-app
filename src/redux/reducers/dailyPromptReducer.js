// Store daily prompt
const dailyPromptReducer = (state=[], action) => action.type === `SET_PROMPT` ? action.payload : state;

export default dailyPromptReducer;