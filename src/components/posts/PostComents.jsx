import React from "react";
import { useAvatar } from "../../hooks/useAvater";
import PostCommentList from "./PostCommentList";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

const PostComents = ({ post }) => {
  const { avatarURl } = useAvatar(post);
  const { auth } = useAuth();
  const [showComment, setShowComment] = useState(false);

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const { api } = useAxios();

  const addComment = async (event) => {
    const keyCode = event.keyCode;

    try {
      if (keyCode === 13) {
        let response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
          { comment }
        );
        if (response.status === 200) {
          setComments([...response.data.comments]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAction = () => {
    setShowComment(!showComment);
  };
  return (
    <>
      {/* <!-- comment section --> */}
      <div>
        {/* <!-- comment input box --> */}
        <div className="flex-center mb-3 gap-2 lg:gap-4">
          <img
            className="max-w-7 max-h-7 rounded-full lg:max-h-[34px] lg:max-w-[34px]"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${
              auth?.user?.avatar
            }`}
            alt="avatar"
          />

          <div className="flex-1">
            <input
              type="text"
              className="h-8 w-full rounded-full bg-lighterDark px-4 text-xs focus:outline-none sm:h-[38px]"
              name="post"
              id="post"
              placeholder="What's on your mind?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={(e) => addComment(e)}
            />
          </div>
        </div>
        {/* <!-- comment filter button --> */}

        <div className="mt-4">
          <button
            onClick={toggleAction}
            className="text-gray-300 max-md:text-sm"
          >
            All Comment ▾
          </button>
        </div>
        {showComment && <PostCommentList comments={comments} />}

        {/* <!-- comments --> */}

        {/* <!-- comments ends --> */}
      </div>
      {/* <!-- comment section ends --> */}
    </>
  );
};

export default PostComents;
