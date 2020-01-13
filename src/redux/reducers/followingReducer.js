const followingReducer = (state=[], action) => {
  if(action.type === `SET_FOLLOWING`){
    return action.payload;
  }
  return state;
}

export default followingReducer;