// Resolve a public-asset path against the app's base URL, so assets work
// whether the site is served from "/" (production) or "/dev/" (staging).
// import.meta.env.BASE_URL is "/" or "/dev/" depending on the build.
export const asset = (path) =>
  import.meta.env.BASE_URL + String(path).replace(/^\//, "");
