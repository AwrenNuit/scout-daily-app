const allImageReducer = (state=[], action) => {
  if(action.type === `SET_ALL_IMAGE`){
    return action.payload;
  }
  return state;
}

export default allImageReducer;