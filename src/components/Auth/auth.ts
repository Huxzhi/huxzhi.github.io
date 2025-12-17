import { getLocalUser, setLocalUser, USER_KEY } from '@/utils/storage'
import { Octokit } from 'octokit'
import config from 'urodele.config'

export const getUserInfo = () => {
  const userInfo = getLocalUser()
  if (!userInfo) {
    return undefined
  }
  login(userInfo.token)
  return userInfo
}

export const login = async (token: string) => {
  const oc = new Octokit({ auth: token })
  const { data } = await oc.request('GET /user')
  const { data: repo } = await oc
    .request('GET /repos/{owner}/{repo}', {
      owner: config.github.login,
      repo: config.github.repo,
    })
    .catch((error) => {
      console.error(error)
      return {
        data: {
          permissions: {},
        },
      }
    })
  const permissions = repo.permissions as { push?: boolean } | undefined
  if (!permissions?.push) {
    throw new Error('login user has no permission to push to current repo')
  }
  setLocalUser({
    name: data.name ?? '',
    avatar: data.avatar_url,
    login: data.login,
    token: token,
    permissions: repo.permissions,
  })
}

export const logout = () => {
  localStorage.removeItem(USER_KEY)
}
