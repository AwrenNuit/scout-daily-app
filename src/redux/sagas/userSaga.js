import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

// POST user follow
function* addFollow(action){
  try{
      yield axios.post(`/api/user/following`, {data: action.payload});
      yield put({type: `GET_FOLLOWING_DETAILS`});
  }
  catch(error){
      console.log('error in POST user follow', error);
  }
}

// DELETE user follow
function* removeFollow(action){
  try{
    console.log('IN DELETE SAGA');
      yield axios.delete(`/api/user/following/${action.payload}`);
      yield put({type: `GET_FOLLOWING_DETAILS`});
  }
  catch(error){
      console.log('error in DELETE user follow', error);
  }
}

// GET following details
function* getFollowingDetails(action){
  try{
      const getResponse = yield axios.get(`/api/user/following/details`);
      yield put({type: `SET_FOLLOWING_DETAILS`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET other user details', error);
  }
}

// GET other user details
function* getOtherUserDetails(action){
  try{
      const getResponse = yield axios.get(`/api/user/details/${action.payload}`);
      yield put({type: `SET_OTHER_USER_DETAILS`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET other user details', error);
  }
}

// GET user details
function* getUserDetails(action){
  try{
      const getResponse = yield axios.get(`/api/user/details`);
      yield put({type: `SET_USER_DETAILS`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET user details', error);
  }
}

// GET users from search
function* getUserSearch(action){
  try{
      const getResponse = yield axios.get(`/api/user/search/${action.payload}`);
      yield put({type: `SET_RESULTS`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET users from search', error);
  }
}

// PUT (update) user avatar
function* putUserAvatar(action){
  try{
      yield axios.put(`/api/user/avatar`, {data: action.payload});
      yield put({type: `GET_USER_DETAILS`});
  }
  catch(error){
      console.log('error in PUT user avatar', error);
  }
}

// PUT (update) user bio
function* putUserBio(action){
  try{
      yield axios.put(`/api/user/details/bio`, {data: action.payload});
      yield put({type: `GET_USER_DETAILS`});
  }
  catch(error){
      console.log('error in PUT user bio', error);
  }
}

// PUT (update) user bio
function* putUsername(action){
  try{
      yield axios.put(`/api/user/details/username`, {data: action.payload});
      yield put({type: `GET_USER_DETAILS`});
  }
  catch(error){
      console.log('error in PUT username', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('ADD_FOLLOW', addFollow);
  yield takeLatest('REMOVE_FOLLOW', removeFollow);
  yield takeLatest('GET_FOLLOWING_DETAILS', getFollowingDetails);
  yield takeLatest('GET_OTHER_USER_DETAILS', getOtherUserDetails);
  yield takeLatest('GET_USER_DETAILS', getUserDetails);
  yield takeLatest('SEARCH_GET', getUserSearch);
  yield takeLatest('UPDATE_AVATAR', putUserAvatar);
  yield takeLatest('UPDATE_BIO', putUserBio);
  yield takeLatest('UPDATE_USERNAME', putUsername);
}

export default userSaga;
