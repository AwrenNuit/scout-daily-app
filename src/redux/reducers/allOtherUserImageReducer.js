const allOtherUserImageReducer = (state=[], action) => {
  if(action.type === `SET_ALL_OTHER_USER_IMAGE`){
    return action.payload;
  }
  return state;
}

export default allOtherUserImageReducer;