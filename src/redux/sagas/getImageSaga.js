import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// GET all images
function* getAllImage(action){
  try{
      const getResponse = yield axios.get(`/api/image/all`, action.payload);
      yield put({type: `SET_ALL_IMAGE`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET all images', error);
  }
}

// GET images of followed users
function* getFollowedAvatar(action){
  try{
      const getResponse = yield axios.get(`/api/image/following`, action.payload);
      yield put({type: `SET_FOLLOWING`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET followed user avatars', error);
  }
}

// GET this image to edit
function* getThisImage(action){
  try{
      const getResponse = yield axios.get(`/api/image/${action.payload}`);
      yield put({type: `SET_THIS_IMAGE`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET this image', error);
  }
}

// POST image
function* postImage(action){
  try{
      yield axios.post(`/api/image`, {data: action.payload});
      yield put({type: `GET_IMAGE`});
  }
  catch(error){
      console.log('error in POST image', error);
  }
}

function* imageSaga() {
  yield takeLatest('GET_ALL_IMAGE', getAllImage);
  yield takeLatest('GET_FOLLOWING', getFollowedAvatar);
  yield takeLatest('GET_THIS_IMAGE', getThisImage);
  yield takeLatest('POST_IMAGE', postImage);  
}

export default imageSaga;