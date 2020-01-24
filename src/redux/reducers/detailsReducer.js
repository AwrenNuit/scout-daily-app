import { combineReducers } from 'redux';

// Store other user's details
const otherUserDetails = (state=[], action) => action.type === `SET_OTHER_USER_DETAILS` ? action.payload : state;

// Store current user's details
const userDetails = (state=[], action) => action.type === `SET_USER_DETAILS` ? action.payload : state;

export default combineReducers({
  otherUserDetails,
  userDetails
});