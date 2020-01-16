const otherUserDetailsReducer = (state=[], action) => {
  if(action.type === `SET_OTHER_USER_DETAILS`){
    return action.payload;
  }
  return state;
}

export default otherUserDetailsReducer;