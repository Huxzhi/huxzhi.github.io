import type { JSONContent } from "@tiptap/core";
import type { PageData } from "./type";
import { slug } from "github-slugger";

const slugify = (v: string) => slug(v, true);

const TITLE_KEY = "__ud_title";
const TAGS_KEY = "__ud_tags";
const CREATE_TIME_KEY = "__ud_create_time";
const UPDATE_TIME_KEY = "__ud_update_time";
const DRAFT_KEY = "__ud_draft";

export const parseMeta = (json: any) => {
  return {
    title: json[TITLE_KEY] as string,
    tags: json[TAGS_KEY] as string[],
    updateTime: json[UPDATE_TIME_KEY] as number,
    createTime: json[CREATE_TIME_KEY] as number,
    draft: Boolean(json[DRAFT_KEY]) as boolean,
  };
};

export const toMeta = (params: Partial<Pick<PageData, "createTime" | "updateTime" | "title" | "tags" | "draft">>) => {
  return {
    [TITLE_KEY]: params.title,
    [TAGS_KEY]: params.tags,
    [UPDATE_TIME_KEY]: params.updateTime,
    [CREATE_TIME_KEY]: params.createTime,
    [DRAFT_KEY]: Boolean(params.draft),
  };
};

export const pathToId = (path: string) => slugify(path.replace(/\.json$/, ""));

export const parseTitle = (json: JSONContent) =>
  json.content
    ?.find((v) => v.type === "heading")
    ?.content?.map((v) => v.text)
    .join("");

export const parseIntro = (json: JSONContent) => {
  return json.content
    ?.find((v) => v.type === "paragraph")
    ?.content?.map((v) => v.text)
    .join("");
};

export const toUniqueFilename = (str: string) => slugify(`${Date.now().toString(36)}-${str}`).replace(/%/g, "-");

export const toFilename = (str: string) => slugify(`${str}`).replace(/%/g, "-");

export const splitFilename = (filename: string) => {
  // 使用 '.' 分割字符串
  const parts = filename.split(".");
  // 如果只有一个部分，说明没有扩展名
  if (parts.length === 1) {
    return { name: filename, extension: "" };
  }
  // 提取扩展名为最后一部分
  const extension = parts.pop();
  // 剩余的部分重新拼接为名称
  const name = parts.join(".");
  return { name, extension };
};
