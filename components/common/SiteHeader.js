import React from "react";
import Link from 'next/link';

const SiteHeader = ({ globalData, sitemapNode, page }) => {
  // get header data
  const { header } = globalData;

  console.log(globalData);

  // set up href for internal links
  let href = "/pages/[...slug]";

  if (!header) {
    return (
      <header className="relative p-8 text-center">
        <p className="text-gray-400 font-bold">No Header Available</p>
      </header>
    );
  }

  return (
    <header className="relative w-full mx-auto bg-white px-8">
      <img
        className="h-14 sm:h-20 w-auto z-50"
        src={header.logo.url}
        alt={header.logo.label}
        title={header.logo.siteName}
      />
      <p className="font-bold text-xl text-secondary-500 ml-3 mt-2">
        {header.siteName}
      </p>
      <nav className="hidden md:flex space-x-10">
        {header.links.map((navitem, index) => {
          console.log(href);
          return (
            <Link href={href} key={`mobile-${index}`} as={navitem.path}>
              <a className="text-base leading-6 font-medium text-secondary-500 hover:text-primary-500 border-transparent border-b-2 hover:border-primary-500 hover:border-b-primary hover:border-b-2 focus:outline-none focus:text-primary-500 transition duration-300">
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
