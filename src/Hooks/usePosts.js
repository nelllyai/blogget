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
        const allPosts = [];

        data.children.forEach(post => {
          const dataPost = post.data;

          allPosts.push({
            id: dataPost.id,
            thumbnail: dataPost.thumbnail,
            title: dataPost.title,
            author: dataPost.author,
            ups: dataPost.ups,
            date: dataPost.created,
          });
        });

        setPosts(allPosts);
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
