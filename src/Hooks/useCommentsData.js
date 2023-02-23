import {useState, useEffect, useContext} from 'react';
import {URL_API} from '../api/const';
import {tokenContext} from '../context/tokenContext';

export const useCommentsData = id => {
  const [commentsData, setCommentsData] = useState([]);
  const {token, delToken} = useContext(tokenContext);

  useEffect(() => {
    if (!token) return;

    fetch(`${URL_API}/comments/${id}`, {
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
        setCommentsData(data.children);
      })
      .catch((err) => {
        if (err.message === '401') {
          delToken();
        }

        console.error(err);
      });
  }, [token]);

  return [commentsData];
};
