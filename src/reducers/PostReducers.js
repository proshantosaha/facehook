import { actions } from "../actions";

const initialState = {
  post: [],
  loading: false,
  error: null,
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actions.post.DATA_FETCHING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actions.post.DATA_FETCHED: {
      return {
        ...state,
        loading: false,
        posts: action.data,
      };
    }
    case actions.post.DATA_FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    case actions.post.DATA_CREATED: {
      return {
        ...state,
        loading: false,
        posts: [...state.posts, action.data],
      };
    }

    case actions.post.DATA_DELETED:
      {
        return {
          ...state,
          loading: false,
          posts: state.posts.filter((item) => item.id !== action.data),
        };
      }

      DATA_DELETED;
    default: {
      return state;
    }
  }
};

export { postReducer, initialState };
