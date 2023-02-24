import Header from './components/Header';
import Main from './components/Main';
import {useDispatch} from 'react-redux';
import {PostsContextProvider} from './context/postsContext';
import {updateToken} from './store/tokenReducer';
import {getToken} from './api/token';

const App = () => {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));

  return (
    <PostsContextProvider>
      <Header />
      <Main />
    </PostsContextProvider>
  );
};

export default App;
