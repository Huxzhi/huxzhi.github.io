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
    bio: '不是工具难用，不是方法难学，而是不知道去向何方',
    description:
      '使用 Astro + CodeMirror + GitHub API 构建动态静态博客。利用 Astro 生成纯静态网页，通过 CodeMirror 提供编辑器，结合 GitHub API 实现内容的动态修改和存储，同时使用 Tailwind CSS 进行样式设计。',
  },
  tech: {
    stack: ['Astro', 'CodeMirror', 'GitHub API', 'Tailwind CSS'],
    features: [
      '纯静态网站生成',
      '在线 Markdown 编辑器',
      'GitHub API 内容存储',
      'Tailwind CSS 样式系统',
      '自动化部署',
    ],
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
