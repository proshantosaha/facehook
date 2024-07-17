import React from "react";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostAction from "./PostAction";
import PostComents from "./PostComents";

const PostCard = ({ post }) => {
  return (
    <article className="card mt-6 lg:mt-8">
      <PostHeader post={post} />
      <PostBody poster={post?.image} content={post?.content} />
      <PostAction post={post} comentCount={post?.comments?.length} />
      <PostComents post={post} />
    </article>
  );
};

export default PostCard;
