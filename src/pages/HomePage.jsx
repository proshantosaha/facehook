import React, { useEffect, useReducer } from "react";
import Header from "../components/common/Header";
import { Link } from "react-router-dom";
import { postReducer, initialState } from "../reducers/PostReducers";
import useAxios from "../hooks/useAxios";
import PostList from "../components/posts/PostList";
import { actions } from "../actions";
import usePost from "../hooks/usePost";
import NewPost from "../components/posts/NewPost";

const HomePage = () => {
  const { state, dispatch } = usePost();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.post.DATA_FETCHING });
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts`
        );

        if (response.status === 200) {
          dispatch({
            type: actions.post.DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: actions.post.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };
    fetchPost();
  }, []);

  if (state?.loading) {
    return <div>we are working ...</div>;
  }

  if (state?.error) {
    return <div>Error in fatching posts {state?.error?.message}</div>;
  }

  return (
    <div>
      <NewPost />
      <PostList posts={state?.posts} />
      {/* <Link to="/me">Go to profile page</Link> */}
    </div>
  );
};

export default HomePage;
