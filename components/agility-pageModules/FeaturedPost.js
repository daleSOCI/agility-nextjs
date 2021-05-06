import React from "react";
import Link from "next/link";
import truncate from "truncate-html";

const FeaturedPost = ({ module }) => {
  // get module fields
  const { fields } = module;

  // get featured post
  const { featuredPost } = fields;

  // convert date
  const dateStr = new Date(featuredPost?.fields.date).toLocaleDateString();

  // truncate post content
  const description = truncate(featuredPost?.fields.content, {
    length: 160,
    decodeEntities: true,
    stripTags: true,
    reserveLastWord: true,
  });

  // set up href for internal links
  const href = "/pages/[...slug]";

  // return null if no featured post is selected
  if (!featuredPost) {
    return null;
  }

  return (
    <div className="feature-post">
      <div>
        <Link href={href} as={`/blog/${featuredPost.fields.slug}`}>
          <a>
            <div>
              <img
                src={featuredPost.fields.image.url}
              />
            </div>
          </a>
        </Link>
      </div>
      <div>
        <Link href={href} as={`/blog/${featuredPost.fields.slug}`}>
          <a>
            <div>
              {featuredPost.fields.category.fields.title}
            </div>
            <div></div>
            <div>
              {dateStr}
            </div>
            <h2>
              {featuredPost.fields.title}
            </h2>
            <p>
              {description}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPost;
