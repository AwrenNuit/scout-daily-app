import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import dailyPrompt from './dailyPromptReducer';
import allImage from './allImageReducer';
import thisImage from './thisImageReducer';
import followingAvatar from './followingAvatarReducer';
import imageFeed from './imageFeedReducer';
import userDetails from './userDetailsReducer';
import viewThisImage from './viewThisImage';
import otherUserDetails from './otherUserDetailsReducer';
import otherUserImage from './allOtherUserImageReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  dailyPrompt, // stores daily photography prompt
  allImage, // stores all user images
  thisImage, // stores image being edited
  followingAvatar, // stores followed page's avatars
  imageFeed, // stores followed page's images
  userDetails, // stores current user's details
  viewThisImage, // stores image being viewed
  otherUserDetails, // stores other user's details
  otherUserImage, // stores other user's images
});

export default rootReducer;
