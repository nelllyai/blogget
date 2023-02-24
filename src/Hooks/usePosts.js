import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {postsRequestAsync} from '../store/posts/postsAction';

export const usePosts = () => {
  const posts = useSelector(state => state.posts.data);
  const token = useSelector(state => state.tokenReducer.token);
  const loading = useSelector(state => state.posts.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsRequestAsync());
  }, [token]);

  return [posts, loading];
};
