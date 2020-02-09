import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

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

function* searchSaga() {
  yield takeLatest('SEARCH_GET', getUserSearch);
}

export default searchSaga;