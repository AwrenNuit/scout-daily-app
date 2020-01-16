import { combineReducers } from 'redux';
import allImage from './allImageReducer';
import dailyPrompt from './dailyPromptReducer';
import errors from './errorsReducer';
import followingAvatar from './followingAvatarReducer';
import followingDetails from './followingDetailsReducer';
import imageFeed from './imageFeedReducer';
import loginMode from './loginModeReducer';
import otherUserDetails from './otherUserDetailsReducer';
import otherUserImage from './allOtherUserImageReducer';
import thisImage from './thisImageReducer';
import user from './userReducer';
import userDetails from './userDetailsReducer';
import viewThisImage from './viewThisImage';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  allImage, // stores all user images
  dailyPrompt, // stores daily photography prompt
  errors, // contains registrationMessage and loginMessage
  followingAvatar, // stores followed page's avatars
  followingDetails, // stores following table data
  imageFeed, // stores followed page's images
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  otherUserDetails, // stores other user's details
  otherUserImage, // stores other user's images
  user, // will have an id and username if someone is logged in
  userDetails, // stores current user's details
  viewThisImage, // stores image being viewed
  thisImage, // stores image being edited
});

export default rootReducer;
