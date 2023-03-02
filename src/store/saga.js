import {watchSearch} from './search/searchSaga';
import {watchComments} from './comments/commentsSaga';
import {all} from 'redux-saga/effects';
import {watchPosts} from './posts/postsSaga';

export default function* rootSaga() {
  yield all([watchSearch(), watchComments(), watchPosts()]);
}
