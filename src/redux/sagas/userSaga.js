import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/user', config);
    yield put({ type: 'SET_USER', payload: response.data });
  } 
  catch (error) {
    console.log('User get request failed', error);
  }
}

// GET user details
function* getUserDetails(){
  try{
    const getResponse = yield axios.get(`/api/user/details`);
    yield put({type: `SET_USER_DETAILS`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET user details', error);
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
  yield takeLatest('GET_USER_DETAILS', getUserDetails);
  yield takeLatest('UPDATE_BIO', putUserBio);
  yield takeLatest('UPDATE_USERNAME', putUsername);
}

export default userSaga;