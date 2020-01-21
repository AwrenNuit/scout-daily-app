import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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
    yield axios.delete(`/api/user/following/${action.payload}`);
    yield put({type: `GET_FOLLOWING_DETAILS`});
  }
  catch(error){
    console.log('error in DELETE user follow', error);
  }
}

function* followSaga() {
  yield takeLatest('ADD_FOLLOW', addFollow);
  yield takeLatest('REMOVE_FOLLOW', removeFollow);
}

export default followSaga;
