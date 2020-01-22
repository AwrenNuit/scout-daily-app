const likeReducer = (state=[], action) => {
  if(action.type === `SET_IMAGE_LIKES`){
    return action.payload;
  }
  return state;
}

export default likeReducer;