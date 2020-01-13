const imageFeedReducer = (state=[], action) => {
  if(action.type === `SET_IMAGE_FEED`){
    return action.payload;
  }
  return state;
}

export default allImageReducer;