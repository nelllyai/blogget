import {watchPosts} from './posts/postsSaga';
// import {watchSearch} from './search/searchSaga';


export default function* rootSaga() {
  // yield watchSearch();
  yield watchPosts();
}
