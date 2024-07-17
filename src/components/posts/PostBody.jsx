import React from "react";

const PostBody = ({ poster, content }) => {
  return (
    <>
      {/* <!-- post body --> */}
      <div className="border-b border-[#3F3F3F] py-4 lg:py-5 lg:text-xl">
        {/* <!-- If Post has Image, Render this block --> */}
        <div className="flex items-center justify-center overflow-hidden">
          {poster && (
            <img
              className="max-w-full"
              src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
              alt="poster"
            />
          )}
        </div>
        <p>{content}</p>
      </div>
      {/* <!-- post body ends --> */}
    </>
  );
};

export default PostBody;
