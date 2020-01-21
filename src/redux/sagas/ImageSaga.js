import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// DELETE image
function* deleteImage(action){
  try{
    yield axios.delete(`/api/image/delete/${action.payload}`);
    yield put({type: `GET_ALL_USER_IMAGE`});
  }
  catch(error){
    console.log('error in DELETE image', error);
  }
}

// GET all other user images
function* getAllOtherUserImage(action){
  try{
    const getResponse = yield axios.get(`/api/image/all/${action.payload}`);
    yield put({type: `SET_ALL_OTHER_USER_IMAGE`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET all other user images', error);
  }
}

// GET all user images
function* getAllUserImage(action){
  try{
    const getResponse = yield axios.get(`/api/image/all`);
    yield put({type: `SET_ALL_IMAGE`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET all user images', error);
  }
}

// GET images of followed users for main feed
function* getImageFeed(action){
  try{
    const getResponse = yield axios.get(`/api/image/following/feed`);
    yield put({type: `SET_IMAGE_FEED`, payload: getResponse.data});
  }
  catch(error){
    console.log('error in GET feed images', error);
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

// GET this image to view
function* getThisImageView(action){
  try{
    const getResponse = yield axios.get(`/api/image/view/${action.payload}`);
    yield put({type: `SET_THIS_IMAGE_VIEW`, payload: getResponse.data});
    yield put({type: `GET_IMAGE_COMMENT`, payload: action.payload});
  }
  catch(error){
    console.log('error in GET this image to view', error);
  }
}

// POST image
function* postImage(action){
  try{
    yield axios.post(`/api/image`, action.payload);
    yield put({type: `GET_ALL_USER_IMAGE`});
  }
  catch(error){
    console.log('error in POST image', error);
  }
}

function* imageSaga() {
  yield takeLatest('DELETE_IMAGE', deleteImage);
  yield takeLatest('GET_ALL_OTHER_USER_IMAGE', getAllOtherUserImage);
  yield takeLatest('GET_ALL_USER_IMAGE', getAllUserImage);
  yield takeLatest('GET_IMAGE_FEED', getImageFeed);
  yield takeLatest('GET_THIS_IMAGE', getThisImage);
  yield takeLatest('VIEW_THIS_IMAGE', getThisImageView);
  yield takeLatest('POST_IMAGE', postImage); 
}

export default imageSaga;