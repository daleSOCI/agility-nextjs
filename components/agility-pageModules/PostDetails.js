import React from "react";
import { renderHTML } from "@agility/nextjs";

const PostDetails = ({ dynamicPageItem }) => {
  // post fields
  const post = dynamicPageItem.fields;

  // category
  const category = post.category?.fields.title || "Uncategorized";

  // format date
  const dateStr = new Date(post.date).toLocaleDateString();

  return (
    <div>
      <div>
        <div>
          <img
            src={post.image.url}
          />
        </div>
        <div>
          <div>
            {category}
          </div>
          <div></div>
          <div>
            {dateStr}
          </div>
          <h1>
            {post.title}
          </h1>
          <div
            dangerouslySetInnerHTML={renderHTML(post.content)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
