import { combineReducers } from 'redux';
import comment from './commentReducer';
import dailyPrompt from './dailyPromptReducer';
import details from './detailsReducer';
import errors from './errorsReducer';
import following from './followingReducer';
import image from './imageReducer';
import like from './likeReducer';
import loginMode from './loginModeReducer';
import searchResult from './searchResultReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  comment, // stores image comments
  dailyPrompt, // stores daily photography prompt
  details, // stores user profile details
  errors, // contains registrationMessage and loginMessage
  following, // stores followed user avatars and details
  image, // stores images
  like, // stores individual likes
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  searchResult, // stores search results
  user, // will have an id and username if someone is logged in
});

export default rootReducer;
