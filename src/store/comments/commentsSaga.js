import axios from 'axios';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {commentsRequestSuccess, commentsRequestError} from './commentsSlice';

function* fetchComments({payload: id}) {
  const token = yield select(state => state.tokenReducer.token);
  if (!token) return;

  try {
    const request = yield call(axios, `${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const post = request.data[0].data.children[0].data;
    const children = request.data[1].data.children;

    const comments = children.map(item => item.data);
    yield put(commentsRequestSuccess({post, comments}));
  } catch (err) {
    yield put(commentsRequestError({error: err}));
  }
}

export function* watchComments() {
  yield takeEvery('comments/commentsRequest', fetchComments);
}
