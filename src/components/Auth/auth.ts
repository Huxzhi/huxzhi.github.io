import { Octokit } from "octokit";
import config from "urodele.config";

export const USER_KEY = "user_github";

export type UserInfo = { name?: string; avatar: string; token: string; login: string; permissions?: { push?: boolean } };

export const getLocalUser = () => {
  if (typeof window == "undefined") return undefined;
  const info = localStorage.getItem(USER_KEY) ?? undefined;
  return info ? (JSON.parse(info) as UserInfo) : undefined;
};
export const setLocalUser = (v: UserInfo) => {
  localStorage.setItem(USER_KEY, JSON.stringify(v));
  return v;
};

export const getUserInfo = () => {
  const userInfo = getLocalUser();
  if (!userInfo) {
    return undefined;
  }
  login(userInfo.token);
  return userInfo;
};

export const login = async (token: string) => {
  const oc = new Octokit({ auth: token });
  const { data } = await oc.request("GET /user");
  const { data: repo } = await oc
    .request("GET /repos/{owner}/{repo}", {
      owner: data.login,
      repo: config.github.repo,
    })
    .catch((error) => {
      console.error(error);
      return {
        data: {
          permissions: {},
        },
      };
    });
  setLocalUser({
    name: data.name ?? undefined,
    avatar: data.avatar_url,
    login: data.login,
    token: token,
    permissions: repo.permissions,
  });
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};
