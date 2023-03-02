import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {commentsRequest} from '../store/comments/commentsSlice';

export const useComments = id => {
  const post = useSelector(state => state.comments.post);
  const comments = useSelector(state => state.comments.comments);
  const status = useSelector(state => state.comments.status);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsRequest(id));
  }, [token]);

  return [post, comments, status];
};
