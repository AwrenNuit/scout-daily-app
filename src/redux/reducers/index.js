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
  comment, // Stores image comments
  dailyPrompt, // Stores daily photography prompt
  details, // Stores user profile details
  errors, // Stores registrationMessage and loginMessage
  following, // Stores followed user avatars and details
  image, // Stores images
  like, // Stores individual likes
  loginMode, // Will have a value of 'login' or 'registration' to control which screen is shown
  searchResult, // Stores search results
  user, // Will have an id and username if someone is logged in
});

export default rootReducer;