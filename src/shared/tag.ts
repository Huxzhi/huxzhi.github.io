// manually pin posts
export const TAG_PIN = "Pin";

export const sortByPin = <T extends { tags: string[]; updateTime: number }>(arr: T[]) => {
  // 按照是否置顶排序，置顶的按照更新时间排序
  return arr.sort((a, b) => {
    const pinned = (v: typeof a) => (v.tags.includes(TAG_PIN) ? v.updateTime : -1);
    const pinnedA = pinned(a);
    const pinnedB = pinned(b);
    return pinnedB - pinnedA;
  });
};
