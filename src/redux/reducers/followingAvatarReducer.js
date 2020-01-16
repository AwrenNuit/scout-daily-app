const followingAvatarReducer = (state=[], action) => {
  if(action.type === `SET_FOLLOWING_AVATAR`){
    console.log('reducer payload:', action.payload);
    return action.payload;
  }
  return state;
}

export default followingAvatarReducer;