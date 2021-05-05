import React from "react";
import Link from 'next/link';

const SiteHeader = ({ globalData, sitemapNode, page }) => {
  // get header data
  const { header } = globalData;

  // set up href for internal links
  let href = "/pages/[...slug]";

  if (!header) {
    return (
      <header>
        <p>No Header Available</p>
      </header>
    );
  }

  return (
    <header>
      <img
        src={header.logo.url}
        alt={header.logo.label}
        title={header.logo.siteName}
      />
      <p>
        {header.siteName}
      </p>
      <nav>
        {header.links.map((navitem, index) => {
          return (
            <Link href={href} key={`mobile-${index}`} as={navitem.path}>
              <a>
                {navitem.title}
              </a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

SiteHeader.getCustomInitialProps = async function ({
  agility,
  languageCode,
  channelName,
}) {
  // set up api
  const api = agility;

  // set up content item
  let contentItem = null;

  // set up links
  let links = [];

  try {
    // try to fetch our site header
    let header = await api.getContentList({
      referenceName: "siteheader",
      languageCode: languageCode,
    });

    // if we have a header, set as content item
    if (header && header.length > 0) {
      contentItem = header[0];

      // else return null
    } else {
      return null;
    }
  } catch (error) {
    if (console) console.error("Could not load site header item.", error);
    return null;
  }

  try {
    // get the nested sitemap
    let sitemap = await api.getSitemapNested({
      channelName: channelName,
      languageCode: languageCode,
    });

    // grab the top level links that are visible on menu
    links = sitemap
      .filter((node) => node.visible.menu)
      .map((node) => {
        return {
          title: node.menuText || node.title,
          path: node.path,
        };
      });
  } catch (error) {
    if (console) console.error("Could not load nested sitemap.", error);
  }

  // return clean object...
  return {
    siteName: contentItem.fields.siteName,
    logo: contentItem.fields.logo,
    links,
  };
};

export default SiteHeader;
