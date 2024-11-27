import * as React from "jsx-dom";
import { getGlobalData } from "../utils/data";

// 根据url中的fromTag参数确定上一篇&下一篇文章
export const mount = async (navSelector: string, dataSelector: string) => {
  const root = document.querySelector<HTMLElement>(navSelector);
  if (!root) return;
  const pageId = root?.getAttribute(dataSelector);
  const _tag = new URL(location.href).searchParams.get("fromTag");
  if (!_tag) return;
  const tag = decodeURIComponent(_tag);
  const posts = await getGlobalData();
  const taggedPosts = posts.filter((v) => v.tags.includes(tag));
  const index = taggedPosts.findIndex((p) => p.id === pageId);

  const prev = taggedPosts[index + 1];
  const next = taggedPosts[index - 1];

  root?.replaceChildren(
    ...[
      prev ? (
        <a href={`/post/${prev.id}?fromTag=${tag}`} class="flex items-center gap-1 text-blue cursor-pointer flex-[45%]">
          <div class="i-ri:arrow-left-double-line w-5 h-5 flex-shrink-0" />
          <div>{prev.title}</div>
        </a>
      ) : (
        <div />
      ),
      next ? (
        <a
          href={`/post/${next.id}?fromTag=${tag}`}
          class="flex items-center justify-end gap-1 text-blue cursor-pointer flex-[45%]">
          <div>{next.title}</div>
          <div class="i-ri:arrow-right-double-line w-5 h-5 flex-shrink-0" />
        </a>
      ) : (
        <div />
      ),
    ].filter(Boolean)
  );
};
