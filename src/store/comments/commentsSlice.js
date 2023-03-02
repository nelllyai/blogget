import {createSlice} from '@reduxjs/toolkit';
// import {commentsRequestAsync} from './commentsAction';

const initialState = {
  post: {},
  comments: [],
  status: '',
  error: {},
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequest: state => {
      state.status = 'loading';
      state.error = {};
    },
    commentsRequestSuccess: (state, action) => {
      state.post = action.payload.post;
      state.comments = action.payload.comments;
      state.status = 'loaded';
      state.error = {};
    },
    commentsRequestError: (state, action) => {
      state.status = 'error';
      state.error = action.payload.error;
    }
  },
});

export const {
  commentsRequest,
  commentsRequestSuccess,
  commentsRequestError
} = commentsSlice.actions;
export default commentsSlice.reducer;
