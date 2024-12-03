export const config = {
  github: {
    login: "glink25", // github login name, not user name
    repo: "test-for-anything", //"urodele",
    logInUrl: "",
    logInAuthUrl: "",
  },
  head: {
    title: "Urodele",
  },
  footer: {
    copyright: "© Glink",
    copyrightUrl: "https://github.com/glink25",
  },
  pagination: {
    size: 10,
  },
  giscus: false as object | false,
} as const;

export default config;
