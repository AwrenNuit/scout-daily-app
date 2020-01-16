const followingDetailsReducer = (state=[], action) => {
  if(action.type === `SET_FOLLOWING_DETAILS`){
    return action.payload;
  }
  return state;
}

export default followingDetailsReducer;