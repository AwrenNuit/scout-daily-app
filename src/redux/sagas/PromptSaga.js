import axios from 'axios';
import {takeLatest, put} from 'redux-saga/effects';

// GET daily prompt
function* getPrompt(action){
  try{
      const getResponse = yield axios.get(`/api/prompt`, action.payload);
      yield put({type: `SET_PROMPT`, payload: getResponse.data});
  }
  catch(error){
      console.log('error in GET prompt', error);
  }
}

function* getPromptSaga() {
  yield takeLatest('GET_PROMPT', getPrompt);
}

export default getPromptSaga;