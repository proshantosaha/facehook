import React, { useState } from "react";

import ThreeDotsIcon from "../../assets/icons/3dots.svg";
import EditIcon from "../../assets/icons/edit.svg";

import DeletIcon from "../../assets/icons/delete.svg";

import TimeIcon from "../../assets/icons/time.svg";
import { getDateDifferenceFromNow } from "../../utils";
import useProfile from "../../hooks/useProfile";
import { useAvatar } from "../../hooks/useAvater";
import { useAuth } from "../../hooks/useAuth";
import usePost from "../../hooks/usePost";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";

const PostHeader = ({ post }) => {
  const { avatarURl } = useAvatar(post);
  const [showAction, setShowAction] = useState(false);

  const auth = useAuth();
  const { api } = useAxios();
  const { dispatch } = usePost();

  const isMe = post?.author?.id == auth?.user?.id;

  const toggleAction = () => {
    setShowAction(!showAction);
  };

  const handleDeletPost = async (event) => {
    dispatch({ type: actions.post.DATA_FETCHING });
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
      );

      if (response.status === 200) {
        dispatch({ type: actions.post.DATA_DELETED, data: post.id });
      }
    } catch (error) {
      console.error(error);
      dispatch({ type: actions.post.DATA_FETCH_ERROR, error: response.error });
    }
  };
  return (
    // <> <!-- post header -->
    <header className="flex items-center justify-between gap-4">
      {/* <!-- author info --> */}
      <div className="flex items-center gap-3">
        <img
          className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
          src={avatarURl}
          alt="avatar"
        />
        <div>
          <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
          <div className="flex items-center gap-1.5">
            <img src={TimeIcon} alt="time" />
            <span className="text-sm text-gray-400 lg:text-base">
              <span>{` ${getDateDifferenceFromNow(post?.createAt)}`} ago</span>
            </span>
          </div>
        </div>
      </div>
      {/* <!-- author info ends --> */}

      {/* <!-- action dot --> */}
      <div className="relative">
        {isMe && (
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>
        )}

        {/* <!-- Action Menus Popup --> */}

        {showAction && (
          <div className="action-modal-container">
            <button className="action-menu-item hover:text-lwsGreen">
              <img src={EditIcon} alt="Edit" />
              Edit
            </button>
            <button className="action-menu-item hover:text-red-500">
              <img src={DeletIcon} alt="Delete" />
              Delete
            </button>
          </div>
        )}
      </div>
      {/* <!-- action dot ends --> */}
    </header>
  );
};

export default PostHeader;
