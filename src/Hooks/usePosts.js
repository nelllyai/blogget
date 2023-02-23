import {useState, useEffect} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

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
          dispatch(deleteToken());
        }

        console.error(err);
      });
  }, [token]);

  return [posts];
};
