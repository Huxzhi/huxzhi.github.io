import { splitFilename, toUniqueFilename } from "../shared/transform";
import type { Editor, JSONContent } from "@tiptap/core";

export const travelDoc = (doc: JSONContent, walker: (v: JSONContent) => void) => {
  walker(doc);
  // doc.content?.forEach((d, i, arr) => walker(arr[i]));
  for (const d of doc.content ?? []) {
    walker(d);
  }
};

export const filterRepeat = <T, K extends keyof T>(arr: T[], id: K) => {
  const r: any[] = [];
  return arr.filter((v) => !r.includes(v[id]));
};

export const getLocalUploadImages = async (editor: Editor) => {
  const editorJSON = editor.getJSON();
  const images: { name: string; url: string }[] = [];
  editor.state.doc.content.forEach((node) => {
    if (node.type.name === "image") {
      const url = node.attrs.src as string;
      if (url.startsWith("blob:")) {
        images.push({ url: node.attrs.src, name: node.attrs.alt });
      }
    }
  });

  const filtered = filterRepeat(images, "url");
  const assets = await Promise.all(
    filtered.map(async (v) => {
      const blob = await (await fetch(v.url)).blob();
      const { name, extension } = splitFilename(v.name);
      const file = new File([blob], [toUniqueFilename(name), extension].join("."));
      return { ...v, file };
    })
  );

  return { assets, editorJSON };
};

export const getDocAssets = (editor: Editor) => {
  const assets: string[] = [];
  editor.state.doc.content.forEach((node) => {
    if (node.type.name === "image") {
      const url = node.attrs.src as string;
      if (url.startsWith("/post-assets")) {
        assets.push(url);
      }
    }
  });
  return [...new Set(assets)];
};
