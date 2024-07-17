import React, { useRef } from "react";
import useProfile from "../../hooks/useProfile";
import useAxios from "../../hooks/useAxios";
import EditIcon from "../../assets/icons/edit.svg";
import { actions } from "../../actions";

const ProfileImage = () => {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploadRef.current.addEventListener("change", updateImageDisplay);
    fileUploadRef.current.click();
  };

  const updateImageDisplay = async () => {
    const fromData = new FormData();
    for (const file of fileUploadRef.current.files) {
      fromData.append("avatar", file);
    }
    const response = await api.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${
        state?.user?.id
      }/avatar`,
      fromData
    );
    if (response.status === 200) {
      dispatch({ type: actions.profile.IMAGE_UPDATED, data: response.data });
    }
    try {
    } catch (error) {
      dispatch({
        type: actions.profile.DATA_FETCH_ERROR,
        error: error.message,
      });
    }
  };
  return (
    <div className="relative mb-8 max-h-[180px] max-w-[180px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
      <img
        className="max-w-full rounded-full"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
        alt={state?.user?.firstName}
      />

      <form>
        <button
          className="flex-center absolute bottom-4 right-4 h-7 w-7 rounded-full bg-black/50 hover:bg-black/80"
          type="submit"
          onClick={handleImageUpload}
        >
          <img src={EditIcon} alt="Edit" />
        </button>

        <input id="file" ref={fileUploadRef} type="file" hidden />
      </form>
    </div>
  );
};

export default ProfileImage;
