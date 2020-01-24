import { combineReducers } from 'redux';

// Store avatars of followed users
const followingAvatar = (state=[], action) => action.type === `SET_FOLLOWING_AVATAR` ? action.payload : state;

// Store details of followed users
const followingDetails = (state=[], action) => action.type === `SET_FOLLOWING_DETAILS` ? action.payload : state;

export default combineReducers({
  followingAvatar,
  followingDetails
});