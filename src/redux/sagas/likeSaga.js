import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// PUT (update) like + 1
function* addLike(action){
  try{
    yield axios.put(`/api/like/add`, {data: action.payload});
    yield put({type: `DISABLE_LIKE`, payload: action.payload});
  }
  catch(error){
    console.log('error in PUT like', error);
  }
}

// DELETE like, enable like button
function* deleteLike(action){
  try{
    yield axios.delete(`/api/like/${action.payload}`);
    yield put({type: `VIEW_THIS_IMAGE`, payload: action.payload});
    yield put({type: `GET_IMAGE_FEED`});
  }
  catch(error){
    console.log('error in DELETE like', error);
  }
}

// POST like, disable like button
function* disableLike(action){
  try{
    console.log('disable like:', action.payload);
    yield axios.post(`/api/like`, {data: action.payload});
    yield put({type: `VIEW_THIS_IMAGE`, payload: action.payload});
    yield put({type: `GET_IMAGE_FEED`});
  }
  catch(error){
    console.log('error in POST like', error);
  }
}

// GET likes for this image
function* getLike(action){
  try{
    const getResponse = yield axios.get(`/api/like/${action.payload}`);
    yield put({type: `SET_LIKE`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET likes', error);
  }
}

// PUT (update) like - 1
function* subLike(action){
  try{
    yield axios.put(`/api/like/sub`, {data: action.payload});
    yield put({type: `DELETE_LIKE`, payload: action.payload});
  }
  catch(error){
    console.log('error in PUT like', error);
  }
}

function* likeSaga() {
  yield takeLatest(`ADD_LIKE`, addLike);
  yield takeLatest(`DELETE_LIKE`, deleteLike);
  yield takeLatest(`DISABLE_LIKE`, disableLike);
  yield takeLatest(`GET_LIKE`, getLike);
  yield takeLatest(`SUB_LIKE`, subLike);
}

export default likeSaga;