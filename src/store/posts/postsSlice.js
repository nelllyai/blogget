import {createSlice} from '@reduxjs/toolkit';
import {postsRequestAsync} from './postsAction';

const initialState = {
  loading: false,
  data: [],
  error: '',
  after: '',
  isLast: false,
  page: '',
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload.page;
    }
  },
  extraReducers: {
    [postsRequestAsync.pending.type]: state => {
      state.loading = true;
      state.error = {};
    },
    [postsRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.after = action.payload.after;
      state.isLast = action.payload.isLast || !!action.payload.after;
      state.page = action.payload.page;
      state.error = {};
    },
    [postsRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default postsSlice.reducer;
