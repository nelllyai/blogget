import {tokenMiddleware, tokenReducer} from './tokenReducer';
import {commentReducer} from './commentReducer';
import {authReducer} from './auth/authReducer';
import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import commentsReducer from './comments/commentsSlice';

export const store = configureStore({
  reducer: {
    tokenReducer,
    commentReducer,
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tokenMiddleware),
});
