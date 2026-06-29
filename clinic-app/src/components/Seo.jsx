import { useEffect } from "react";

const ORIGIN = "https://www.drclinicdublin.com";

// Update the per-route document title, meta description, canonical and the
// shared OG/Twitter tags. Needed because this is a client-rendered SPA, so
// each route must set its own metadata for search engines and link previews.
function setAttr(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el && value != null) el.setAttribute(attr, value);
}

export default function Seo({ title, description, path = "/" }) {
  useEffect(() => {
    const url = ORIGIN + path;
    if (title) document.title = title;

    setAttr('meta[name="description"]', "content", description);
    setAttr('link[rel="canonical"]', "href", url);

    setAttr('meta[property="og:title"]', "content", title);
    setAttr('meta[property="og:description"]', "content", description);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[name="twitter:title"]', "content", title);
    setAttr('meta[name="twitter:description"]', "content", description);
  }, [title, description, path]);

  return null;
}
