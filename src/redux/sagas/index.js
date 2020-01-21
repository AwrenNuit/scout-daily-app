import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import getPromptSaga from './PromptSaga';
import imageSaga from './ImageSaga';
import followSaga from './followSaga';
import searchSaga from './searchSaga';
import likeSaga from './likeSaga';
import avatarSaga from './avatarSaga';
import commentSaga from './commentSaga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    getPromptSaga(),
    imageSaga(),
    followSaga(),
    searchSaga(),
    likeSaga(),
    avatarSaga(),
    commentSaga(),
  ]);
}
