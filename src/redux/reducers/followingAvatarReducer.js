const followingAvatarReducer = (state=[], action) => {
  if(action.type === `SET_FOLLOWING_AVATAR`){
    return action.payload;
  }
  return state;
}

export default followingAvatarReducer;