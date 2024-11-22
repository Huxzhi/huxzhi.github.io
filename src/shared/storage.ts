export const USER_KEY = 'user_github'
export type UserInfo = { name: string, avatar: string, token: string, login: string, permissions: { push?: boolean } }
export const getLocalUser = () => {
    if (typeof window == 'undefined') return undefined
    const info = localStorage.getItem(USER_KEY) ?? undefined
    return info ? JSON.parse(info) as UserInfo : undefined
}