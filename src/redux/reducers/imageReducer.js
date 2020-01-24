import { combineReducers } from 'redux';

// Store current user's images
const allUserImage = (state=[], action) => action.type === `SET_ALL_IMAGE` ? action.payload : state;

// Store other user's images
const allOtherUserImage = (state=[], action) => action.type === `SET_ALL_OTHER_USER_IMAGE` ? action.payload : state;

// Store main feed images
const imageFeed = (state=[], action) => action.type === `SET_IMAGE_FEED` ? action.payload : state;

// Store selected image
const thisImage = (state=[], action) => action.type === `SET_THIS_IMAGE` ? action.payload : state;

// Store selected image from other user
const viewThisImage = (state=[], action) => action.type === `SET_THIS_IMAGE_VIEW` ? action.payload : state;

export default combineReducers({
  allUserImage,
  allOtherUserImage,
  imageFeed,
  thisImage,
  viewThisImage,
});