import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// POST user follow
function* addFollow(action){
  try{
    yield axios.post(`/api/following`, {data: action.payload});
    yield put({type: `GET_FOLLOWING_DETAILS`});
  }
  catch(error){
    console.log('error in POST user follow', error);
  }
}

// GET following details
function* getFollowingDetails(){
  try{
    const getResponse = yield axios.get(`/api/following/details`);
    yield put({type: `SET_FOLLOWING_DETAILS`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET other user details', error);
  }
}

// GET other user details
function* getOtherUserDetails(action){
  try{
    const getResponse = yield axios.get(`/api/following/details/${action.payload}`);
    yield put({type: `SET_OTHER_USER_DETAILS`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET other user details', error);
  }
}

// DELETE user follow
function* removeFollow(action){
  try{
    yield axios.delete(`/api/following/${action.payload}`);
    yield put({type: `GET_FOLLOWING_DETAILS`});
  }
  catch(error){
    console.log('error in DELETE user follow', error);
  }
}

function* followSaga() {
  yield takeLatest('ADD_FOLLOW', addFollow);
  yield takeLatest('GET_FOLLOWING_DETAILS', getFollowingDetails);
  yield takeLatest('GET_OTHER_USER_DETAILS', getOtherUserDetails);
  yield takeLatest('REMOVE_FOLLOW', removeFollow);
}

export default followSaga;