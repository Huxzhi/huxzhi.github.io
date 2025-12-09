export const config = {
  github: {
    login: 'huxzhi', // github login name, not user name
    repo: 'huxzhi.github.io', //"urodele",
    logInUrl: '',
    logInAuthUrl: '',
  },
  head: {
    title: 'Huxzhi',
    brand: 'Huxzhi',
    description: 'A self-owned full-static blog system',
  },
  footer: {
    copyright: '© Huxzhi',
    copyrightUrl: 'https://github.com/Huxzhi',
  },
  pagination: {
    size: 10,
  },
  giscus: false as object | false,
} as const

export default config
