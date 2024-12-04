import { toMeta } from "@/shared/transform";
import type { DeletePageByPath, ReadPageByPath, WritePage } from "../helper";

const PREFIX = location.origin;

export const readPageByPath: ReadPageByPath = async (path) => {
  // const path = `/pages/${_path}.json`;
  const json = await (await fetch(`${PREFIX}/api/post/${path}`)).json();
  return json;
};

export const writePage: WritePage = async (path, data, assets) => {
  const form = new FormData();
  assets.forEach((asset, i) => {
    if (i === 0) {
      form.set("assets", asset.file);
    } else form.append("assets", asset.file);
  });
  const meta = toMeta({ ...data, updateTime: Date.now() });
  const rawString = JSON.stringify({ ...meta, ...JSON.parse(data.content) });
  const strFile = new File([new Blob([rawString], { type: "text/plain" })], "content.json");
  form.append("content", strFile);
  await fetch(`${PREFIX}/api/post/${path}`, { method: "POST", body: form });
};

export const deletePageByPath: DeletePageByPath = async (path, assets) => {
  await fetch(`${PREFIX}/api/post/${path}`, {
    method: "DELETE",
    body: JSON.stringify({ path, assets }),
    headers: {
      "content-type": "application/json",
    },
  });
};
