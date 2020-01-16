const imageFeedReducer = (state=[], action) => {
  if(action.type === `SET_IMAGE_FEED`){
    console.log('in REDUCER');
    return action.payload;
  }
  return state;
}

export default imageFeedReducer;