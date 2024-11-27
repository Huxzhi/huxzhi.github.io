import { readFile, readdir } from "fs/promises";
import { parseMeta, pathToId, parseIntro } from "@/shared/transform";
import type { JSONContent } from "@tiptap/core";
import { getSSRHTML } from "@/editor/extensions";
import type { PageDetail, ShortPageData } from "@/shared/type";

const detailCache = new Map<string, PageDetail>();
const getPageDetail = async (path: string) => {
  if (detailCache.has(path)) {
    return detailCache.get(path)!;
  }
  const text = await readFile(path, { encoding: "utf-8" });
  const content = JSON.parse(text) as JSONContent;
  const meta = parseMeta(content);
  const cover = content.content?.find((v) => v.type === "image")?.attrs as any;
  const detail = {
    content: text,
    ...meta,
    intro: parseIntro(content) ?? "",
    html: getSSRHTML(content),
    cover,
  };
  if (import.meta.env.PROD) {
    detailCache.set(path, detail);
  }
  return detail;
};

const listCache = new Map<boolean, ShortPageData[]>();
export const getPageList = async (filterDraft = true) => {
  if (listCache.has(filterDraft)) return listCache.get(filterDraft)!;
  const dir = await readdir("./posts", { withFileTypes: true });
  const rawPageData = await Promise.all(
    dir
      .filter((v) => v.isFile() && v.name.endsWith(".json"))
      .map(async (v) => {
        const filePath = `./posts/${v.name}`;
        const detail = await getPageDetail(filePath);
        const id = pathToId(v.name);
        return {
          ...detail,
          id,
          path: v.name.replace(/\.json$/, ""),
          html: undefined,
          content: undefined,
        };
      })
  );

  const pageData = rawPageData
    // 按照创建时间先后排序
    .sort((a, b) => b.createTime - a.createTime);

  if (filterDraft) {
    const filtered = pageData.filter((p) => !p.draft);
    if (import.meta.env.PROD) {
      listCache.set(filterDraft, filtered);
    }
    return pageData.filter((p) => !p.draft);
  }
  if (import.meta.env.PROD) {
    listCache.set(filterDraft, pageData);
  }
  return pageData;
};

export const getSinglePageData = async (id: string) => {
  const filePath = `./posts/${decodeURIComponent(id)}.json`;
  const detail = await getPageDetail(filePath);
  return {
    ...detail,
    id,
    path: `/posts/${id}.json`,
  };
};

export async function GET() {
  const list = await getPageList(false);
  return new Response(JSON.stringify(list), { status: 200 });
}
