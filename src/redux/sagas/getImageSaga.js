import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// PUT (update) like
function* addLike(action){
  try{
      yield axios.put(`/api/image/like`, {data: action.payload});
      yield put({type: `GET_IMAGE_FEED`});
  }
  catch(error){
      console.log('error in PUT like', error);
  }
}

// DELETE image
function* deleteImage(action){
  try{
      yield axios.delete(`/api/image/${action.payload}`);
      yield put({type: `GET_ALL_USER_IMAGE`});
  }
  catch(error){
      console.log('error in DELETE image', error);
  }
}

// GET all images
function* getAllImage(action){
  try{
      const getResponse = yield axios.get(`/api/image/all`);
      yield put({type: `SET_ALL_IMAGE`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET all images', error);
  }
}

// GET avatars of followed users
function* getFollowedAvatar(action){
  try{
      const getResponse = yield axios.get(`/api/image/following/avatar`, action.payload);
      yield put({type: `SET_FOLLOWING_AVATAR`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET followed user avatars', error);
  }
}

// GET images of followed users for main feed
function* getImageFeed(action){
  try{
      const getResponse = yield axios.get(`/api/image/following/feed`, action.payload);
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

// PUT (update) image caption
function* updateImageCaption(action){
  try{
      yield axios.put(`/api/image/caption`, action.payload);
      yield put({type: `GET_IMAGE`});
  }
  catch(error){
      console.log('error in PUT image caption', error);
  }
}

function* imageSaga() {
  yield takeLatest(`ADD_LIKE`, addLike);
  yield takeLatest('DELETE_IMAGE', deleteImage);  
  yield takeLatest('GET_ALL_USER_IMAGE', getAllImage);
  yield takeLatest('GET_FOLLOWING', getFollowedAvatar);
  yield takeLatest('GET_IMAGE_FEED', getImageFeed);
  yield takeLatest('GET_THIS_IMAGE', getThisImage);
  yield takeLatest('VIEW_THIS_IMAGE', getThisImageView);
  yield takeLatest('POST_IMAGE', postImage); 
  yield takeLatest('UPDATE_CAPTION', updateImageCaption); 
}

export default imageSaga;