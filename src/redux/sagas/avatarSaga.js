import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// GET avatars of followed users
function* getFollowedAvatar(action){
  try{
    const getResponse = yield axios.get(`/api/avatar/following`, action.payload);
    yield put({type: `SET_FOLLOWING_AVATAR`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET followed user avatars', error);
  }
}

// PUT (update) user avatar
function* putUserAvatar(action){
  try{
    yield axios.put(`/api/avatar`, {data: action.payload});
    yield put({type: `GET_USER_DETAILS`});
  }
  catch(error){
    console.log('error in PUT user avatar', error);
  }
}

function* avatarSaga() {
  yield takeLatest('GET_FOLLOWING', getFollowedAvatar);
  yield takeLatest('UPDATE_AVATAR', putUserAvatar);
}

export default avatarSaga;
