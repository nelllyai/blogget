import {all} from 'redux-saga/effects';
import {watchComments} from './comments/commentsSaga';
import {watchPosts} from './posts/postsSaga';

export default function* rootSaga() {
  yield all([watchComments(), watchPosts()]);
}
