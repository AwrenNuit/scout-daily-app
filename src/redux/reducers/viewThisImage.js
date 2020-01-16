const viewThisImageReducer = (state=[], action) => {
  if(action.type === `SET_THIS_IMAGE_VIEW`){
    return action.payload;
  }
  return state;
}

export default viewThisImageReducer;