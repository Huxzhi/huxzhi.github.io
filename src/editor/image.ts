import { Editor } from "@tiptap/core";
import type { EditorProps } from "@tiptap/pm/view";

export const createHandlePaste: (getEditor: () => Editor) => EditorProps["handlePaste"] =
  (getEditor) => (view, event, slice) => {
    const editor = getEditor();
    const items = event.clipboardData?.items ?? [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (!file) {
          break;
        }
        const blobUrl = URL.createObjectURL(file);
        const transaction = view.state.tr.insert(
          view.state.selection.$from.pos - 1,
          view.state.schema.nodes.image.create({ src: blobUrl, alt: file.name })
        );
        view.dispatch(transaction);
      }
    }
  };

export const createHandleDrop: (getEditor: () => Editor) => EditorProps["handleDrop"] =
  (getEditor) => (view, event, slice) => {
    event.preventDefault();
    const editor = getEditor();
    const coords = { left: event.clientX, top: event.clientY };
    const dropPos = view.posAtCoords(coords)?.pos;
    if (!dropPos) {
      return;
    }
    const items = event.dataTransfer?.items ?? [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (!file) {
          break;
        }
        const blobUrl = URL.createObjectURL(file);
        const transaction = view.state.tr.insert(
          dropPos,
          view.state.schema.nodes.image.create({ src: blobUrl, alt: file.name })
        );
        view.dispatch(transaction);

        // // 读取文件作为 Blob
        // const reader = new FileReader();
        // reader.onload = () => {
        //     const blobUrl = reader.result as string; // Blob URL

        // };

        // reader.readAsDataURL(file); // 将文件读取为 Data URL
      }
    }
  };

export const createHandleImageProps = (getEditor: () => Editor) => {
  return {
    handlePaste: createHandlePaste(getEditor),
    handleDrop: createHandleDrop(getEditor),
  };
};
