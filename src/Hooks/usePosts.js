import {useState, useEffect, useContext} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const {token, delToken} = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/best`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          throw new Error(response.status);
        }

        return response.json();
      })
      .then(({data}) => {
        setPosts(data.children);
      })
      .catch((err) => {
        if (err.message === '401') {
          delToken();
        }

        console.error(err);
      });
  }, [token]);

  return [posts];
};
