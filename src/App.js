import Header from './components/Header';
import Main from './components/Main';
import {useToken} from './Hooks/useToken';

function App() {
  const [token, delToken] = useToken('');

  return (
    <>
      <Header token={token} delToken={delToken} />
      <Main />
    </>
  );
}

export default App;
