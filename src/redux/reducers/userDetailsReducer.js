const userDetailsReducer = (state=[], action) => {
  if(action.type === `SET_USER_DETAILS`){
    return action.payload;
  }
  return state;
}

export default userDetailsReducer;