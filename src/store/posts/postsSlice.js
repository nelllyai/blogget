import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
  search: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: state => {
      state.loading = true;
      state.error = {};
    },
    postsRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.after = action.payload.after;
      state.isLast = action.payload.isLast || !!action.payload.after;
      state.page = action.payload.page;
      state.error = {};
      state.search = action.payload.search;
    },
    postsRequestError: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const {
  postsRequest,
  postsRequestSuccess,
  postsRequestError,
  searchRequest
} = postsSlice.actions;
export default postsSlice.reducer;
