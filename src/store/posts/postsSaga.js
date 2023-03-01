import {put, select, takeLatest, call} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import axios from 'axios';
import {
  changePage,
  postsRequestError,
  postsRequestSuccess,
  postsRequestSuccessAfter,
  POSTS_REQUEST
} from './postsAction';

function* fetchPosts(newPage) {
  console.log(newPage);
  let page = yield select(state => state.posts.page);

  if (newPage) {
    page = newPage;
    yield put(changePage(page));
  }

  const token = yield select(state => state.tokenReducer.token);
  const after = yield select(state => state.posts.after);
  const loading = yield select(state => state.posts.loading);
  const isLast = yield select(state => state.posts.isLast);

  if (!token || loading || isLast) {
    return;
  }

  try {
    const request = yield call(axios,
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

    if (after) {
      yield put(postsRequestSuccessAfter(request.data.data));
    } else {
      yield put(postsRequestSuccess(request.data.data));
    }
  } catch (err) {
    yield put(postsRequestError(err));
  }
}

export function* watchPosts() {
  yield takeLatest(POSTS_REQUEST, fetchPosts);
}
