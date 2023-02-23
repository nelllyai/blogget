import {useState, useEffect} from 'react';
import {URL_API} from '../api/const';
import {useDispatch, useSelector} from 'react-redux';
import {deleteToken} from '../store';

export const useCommentsData = id => {
  const [commentsData, setCommentsData] = useState([]);
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/comments/${id}`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(
        ([
          {
            data: {
              children: [{data: post}],
            },
          },
          {
            data: {
              children,
            },
          },
        ]) => {
          const comments = children.map(item => item.data);
          comments.pop();
          setCommentsData([post, comments]);
        },
      )
      .catch((err) => {
        if (err.message === '401') {
          dispatch(deleteToken());
        }

        console.error(err);
      });
  }, [token]);

  return [commentsData];
};
