import axios from 'axios';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {postsRequestSuccess, postsRequestError} from './postsSlice';

function* fetchPosts({payload: newPage}) {
  const prevPosts = yield select(state => state.posts.data);
  let after = yield select(state => state.posts.after);
  let page = yield select(state => state.posts.page);

  if (newPage) {
    page = newPage;
    after = '';
  }

  const token = yield select(state => state.tokenReducer.token);

  if (!token) return;

  try {
    const request = yield call(
      axios,
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

    const postsData = request.data.data;
    const nextPosts = postsData.children;

    console.log(postsData);
    console.log(nextPosts);

    if (after) {
      yield put(postsRequestSuccess({
        data: [...prevPosts, ...nextPosts],
        after: postsData.after,
        page
      }));
    } else {
      yield put(postsRequestSuccess({
        data: nextPosts,
        after: postsData.after,
        page
      }));
    }
  } catch (err) {
    yield put(postsRequestError({error: err}));
  }
}

export function* watchPosts() {
  yield takeEvery('posts/postsRequest', fetchPosts);
}
