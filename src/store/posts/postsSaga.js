import axios from 'axios';
import {call, put, select, takeEvery} from 'redux-saga/effects';
import {URL_API} from '../../api/const';
import {postsRequestSuccess, postsRequestError} from './postsSlice';

function* fetchPosts({
  payload: {search: newSearch = '', page: newPage = ''} = {}
}) {
  let prevPosts = yield select(state => state.posts.data);
  let after = yield select(state => state.posts.after);
  let page = yield select(state => state.posts.page);

  let search = yield select(state => state.posts.search);
  if (newSearch) {
    search = newSearch;
    prevPosts = [];
    after = '';
    page = '';
  } else if (newPage) {
    page = newPage;
    after = '';
    search = '';
  }

  const token = yield select(state => state.tokenReducer.token);

  if (!token) return;

  console.log(`search?q=${search}?limit=10&${after ? `after=${after}` : ''}`);

  try {
    const request = yield call(
      axios,
      `${URL_API}/${search ?
        `search?q=${search}&limit=10&${after ? `after=${after}` : ''}` :
        `${page}?limit=10&${after ? `after=${after}` : ''}`}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

    const postsData = request.data.data;
    const nextPosts = postsData.children;

    if (after) {
      yield put(postsRequestSuccess({
        data: [...prevPosts, ...nextPosts],
        after: postsData.after,
        page,
        search
      }));
    } else {
      yield put(postsRequestSuccess({
        data: nextPosts,
        after: postsData.after,
        page,
        search
      }));
    }
  } catch (err) {
    yield put(postsRequestError({error: err}));
  }
}

export function* watchPosts() {
  yield takeEvery('posts/postsRequest', fetchPosts);
}
