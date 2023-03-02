import {watchSearch} from './search/searchSaga';
import {watchComments} from './comments/commentsSaga';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([watchSearch(), watchComments()]);
}
