import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_ERROR,
  COMMENTS_REQUEST_SUCCESS
} from './commentsAction';

const initialState = {
  data: [],
  status: '',
  error: '',
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        status: 'loading',
        error: '',
      };

    case COMMENTS_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        status: 'loaded',
        error: '',
      };

    case COMMENTS_REQUEST_ERROR:
      return {
        ...state,
        status: 'error',
        error: action.error,
      };

    default:
      return state;
  }
};
