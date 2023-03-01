export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESS = 'POSTS_REQUEST_SUCCESS';
export const POSTS_REQUEST_SUCCESS_AFTER = 'POSTS_REQUEST_SUCCESS_AFTER';
export const POSTS_REQUEST_ERROR = 'POSTS_REQUEST_ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const postsRequest = () => ({
  type: POSTS_REQUEST,
});

export const postsRequestSuccess = data => ({
  type: POSTS_REQUEST_SUCCESS,
  data: data.children,
  after: data.after,
});

export const postsRequestSuccessAfter = data => ({
  type: POSTS_REQUEST_SUCCESS_AFTER,
  data: data.children,
  after: data.after,
});

export const postsRequestError = error => ({
  type: POSTS_REQUEST_ERROR,
  error,
});

export const changePage = page => ({
  type: CHANGE_PAGE,
  page,
});
