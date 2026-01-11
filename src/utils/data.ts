import type { ShortPageData } from "../shared/type";

let globalData: ShortPageData[] | undefined;
export const getGlobalData = async () => {
  if (globalData) return globalData;
  globalData = await (await fetch(`${location.origin}/api/post/list`)).json();
  return globalData!;
};
