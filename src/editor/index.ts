import { Editor } from "@tiptap/core";
import GlobalFrontHandle from "./frontHandle";
import "./style.scss";
import { generateHTML } from "@tiptap/html";

import { createSlashCommandPlugin } from "./commands";
import { createBubbleMenuPlugin } from "./bubbleMenu.tsx";
import { createLowlightCodePlugin } from "./lowlight.tsx";
import { createHandleImageProps } from "./image";
import { getBasicExtensions } from "./extensions";

export const createEditor = (parent: HTMLElement, initialContent: string) => {
  const root = document.createElement("div");
  root.className = "ud-root editable";
  parent?.appendChild(root);

  const basicExtension = [...getBasicExtensions(), createLowlightCodePlugin()];
  const extensions = [
    GlobalFrontHandle,

    ...basicExtension,
    createBubbleMenuPlugin(root, () => editor),
    createSlashCommandPlugin(),
  ];

  const initialHtml = initialContent === "" ? "" : generateHTML(JSON.parse(initialContent), basicExtension);

  // console.log(initialHtml);
  const editor: Editor = new Editor({
    element: root,
    extensions: extensions,
    content: initialHtml,
    editorProps: {
      ...createHandleImageProps(() => editor),
    },
  });

  return editor;
};
