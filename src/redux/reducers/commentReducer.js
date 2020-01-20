// Store image comments
const commentReducer = (state=[], action) => {
  if(action.type === `SET_IMAGE_COMMENT`){
    return action.payload;
  }
  return state;
}

export default commentReducer;