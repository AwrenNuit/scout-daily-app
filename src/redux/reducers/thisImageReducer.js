const thisImageReducer = (state=[], action) => {
  if(action.type === `SET_THIS_IMAGE`){
    return action.payload;
  }
  return state;
}

export default thisImageReducer;