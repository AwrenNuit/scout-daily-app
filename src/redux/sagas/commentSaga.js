import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// GET images comments
function* getImageComment(action){
  try{
    const getResponse = yield axios.get(`/api/comment/${action.payload}`);
    yield put({type: `SET_IMAGE_COMMENT`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET image comments', error);
  }
}

// POST comment
function* postComment(action){
  try{
    yield axios.post(`/api/comment`, action.payload);
    yield put({type: `GET_IMAGE_COMMENT`, payload: action.payload.id});
  }
  catch(error){
    console.log('error in POST comment', error);
  }
}

// PUT (update) image caption
function* updateImageCaption(action){
  try{
    yield axios.put(`/api/comment/caption`, action.payload);
    yield put({type: `GET_IMAGE`});
  }
  catch(error){
    console.log('error in PUT image caption', error);
  }
}

function* commentSaga() {
  yield takeLatest('GET_IMAGE_COMMENT', getImageComment);
  yield takeLatest('POST_COMMENT', postComment);
  yield takeLatest('UPDATE_CAPTION', updateImageCaption); 
}

export default commentSaga;