import type { PageData } from "../shared/type";

export type ReadPageByPath = (path: string) => Promise<PageData>;

export type WritePage = (
  path: string,
  data: Pick<PageData, "content" | "title" | "tags" | "createTime" | "draft"> & Partial<Pick<PageData, "path">>,
  assets: { name: string; url: string; file: File }[]
) => Promise<void>;

export type DeletePageByPath = (path: string, assets: string[]) => Promise<void>;
