import React from "react";
import Link from "next/link";

const PostsListing = ({ module, customData }) => {
  // get posts
  const { posts } = customData;

  // set up href for internal links
  let href = "/pages/[...slug]";

  // if there are no posts, display message on frontend
  if (posts.length <= 0) {
    return (
      <div>
        <h1>No posts available.</h1>
        <div>
          <Link href={href} as="/home">
            <a>
              Return Home
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-listings">
      {posts.map((post, index) => (
        <Link href={href} as={post.url} key={index}>
          <a>
            <div>
              <div>
                <img
                  src={post.imageSrc}
                  alt={post.imageAlt}
                />
              </div>
              <div>
                <div>
                  {post.category}
                </div>
                <div></div>
                <div>
                  {post.date}
                </div>
                <h2>
                  {post.title}
                </h2>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

// function to resole post urls
const resolvePostUrls = function (sitemap, posts) {
  let dynamicUrls = {};
  posts.forEach((post) => {
    Object.keys(sitemap).forEach((path) => {
      if (sitemap[path].contentID === post.contentID) {
        dynamicUrls[post.contentID] = path;
      }
    });
  });
  return dynamicUrls;
};

PostsListing.getCustomInitialProps = async ({
  agility,
  channelName,
  languageCode,
}) => {
  // set up api
  const api = agility;

  try {
    // get sitemap...
    let sitemap = await api.getSitemap({
      channelName: channelName,
      languageCode,
    });

    // get posts...
    let rawPosts = await api.getContentList({
      referenceName: "posts",
      languageCode,
    });

    // get categories...
    let categories = await api.getContentList({
      referenceName: "categories",
      languageCode,
    });

    // resolve dynamic urls
    const dynamicUrls = resolvePostUrls(sitemap, rawPosts);

    const posts = rawPosts.map((post) => {
      // categoryID
      const categoryID = post.fields.category?.contentid;

      // find category
      const category = categories?.find((c) => c.contentID == categoryID);

      // date
      const date = new Date(post.fields.date).toLocaleDateString();

      // url
      const url = dynamicUrls[post.contentID] || "#";

      // post image src
      let imageSrc = post.fields.image.url;

      // post image alt
      let imageAlt = post.fields.image?.label || null;

      return {
        contentID: post.contentID,
        title: post.fields.title,
        date,
        url,
        category: category?.fields.title || "Uncategorized",
        imageSrc,
        imageAlt,
      };
    });

    return {
      posts,
    };
  } catch (error) {
    if (console) console.error(error);
  }
};

export default PostsListing;
