import {AuthContextProvider} from './context/authContext';
import {TokenContextProvider} from './context/tokenContext';
import Header from './components/Header';
import Main from './components/Main';
import {PostsContextProvider} from './context/postsContext';

function App() {
  return (
    <TokenContextProvider value={{}}>
      <AuthContextProvider value={{}}>
        <Header />
        <PostsContextProvider value={{}}>
          <Main />
        </PostsContextProvider>
      </AuthContextProvider>
    </TokenContextProvider>
  );
}

export default App;
