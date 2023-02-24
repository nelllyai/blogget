import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {commentsRequestAsync} from '../store/comments/commentsAction';

export const useComments = id => {
  const postData = useSelector(state => state.comments.data);
  const status = useSelector(state => state.comments.status);
  const token = useSelector(state => state.tokenReducer.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentsRequestAsync(id));
  }, [token]);

  return [postData, status];
};
