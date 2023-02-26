/* eslint-disable arrow-body-style */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from '../../api/const';

export const postsRequestAsync = createAsyncThunk(
  'posts/fetch',
  (newPage, {getState}) => {
    const prevPosts = getState().posts.data;
    const after = getState().posts.after;

    const isLast = getState().posts.isLast;
    console.log(isLast);

    let page = getState().posts.page;

    if (newPage) {
      page = newPage;
      return {data: prevPosts, after, page};
    }

    const token = getState().tokenReducer.token;

    if (!token || isLast) {
      console.log(token, isLast);
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
        console.log(data);
        const postsData = data.data;
        const nextPosts = postsData.children;

        if (postsData.after) {
          return {
            data: [...prevPosts, ...nextPosts],
            after: postsData.after,
            page
          };
        }

        return {data: nextPosts, after, page};
      })
      .catch(error => Promise.reject(error));
  },
);
