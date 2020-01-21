import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getPromptSaga from './getPromptSaga';
import imageSaga from './getImageSaga';
import followSaga from './followSaga';
import searchSaga from './searchSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getPromptSaga(),
    imageSaga(),
    followSaga(),
    searchSaga(),
  ]);
}
