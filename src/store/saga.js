// import {watchSearch} from './search/searchSaga';
import {watchComments} from './comments/commentsSaga';

export default function* rootSaga() {
  // yield watchSearch();
  yield watchComments();
}
