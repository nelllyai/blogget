/* eslint-disable arrow-body-style */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../../api/const';

export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, {getState}) => {
    const prevPosts = getState().posts.data;
    let after = getState().posts.after;
    let page = getState().posts.page;

    if (newPage) {
      page = newPage;
      after = '';
    }

    const token = getState().tokenReducer.token;

    if (!token) {
      return {data: prevPosts, after, page};
    }

    return axios(
      `${URL_API}/${page}?limit=10&${after ? `after=${after}` : ''}`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then(({data}) => {
        const postsData = data.data;
        const nextPosts = postsData.children;

        if (after) {
          return {
            data: [...prevPosts, ...nextPosts],
            after: postsData.after,
            page
          };
        }

        return {data: nextPosts, after: postsData.after, page};
      })
      .catch(error => Promise.reject(error));
  },
);
