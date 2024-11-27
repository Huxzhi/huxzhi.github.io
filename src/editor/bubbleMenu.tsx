import * as React from "jsx-dom";

import { Editor } from "@tiptap/core";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import { useAttrRef } from "@/utils/dom";

export const createBubbleMenu = (getEditor: () => Editor) => {
  const [setRef, setAttr] = useAttrRef({} as Record<string, any>, true);
  const updateActive = () => {
    const editor = getEditor();
    const attr = ["bold", "italic", "underline", "strike", "code", "link"].reduce((p, v) => {
      const isActive = editor.isActive(v);
      return {
        ...p,
        [`data-ud-active-${v}`]: isActive,
      };
    }, {} as Record<string, any>);
    setAttr({
      ...attr,
    });
  };
  Promise.resolve().then(() => {
    const editor = getEditor();
    editor.on("selectionUpdate", () => {
      updateActive();
    });
  });
  return (
    <div ref={setRef} className="ud-root bubble-menu">
      <button
        class="ud-bm-bold"
        onClick={() => {
          const editor = getEditor();
          editor.chain().focus().toggleBold().run();
          updateActive();
        }}>
        <div class="i-material-symbols:format-bold pointer-events-none"></div>
      </button>
      <button
        class="ud-bm-italic"
        onClick={() => {
          const editor = getEditor();
          editor.chain().focus().toggleItalic().run();
          updateActive();
        }}>
        <div class="i-material-symbols:format-italic"></div>
      </button>
      <button
        class="ud-bm-underline"
        onClick={() => {
          const editor = getEditor();
          editor.chain().focus().toggleUnderline().run();
          updateActive();
        }}>
        <div class="i-material-symbols:format-underlined"></div>
      </button>
      <button
        class="ud-bm-strike"
        onClick={() => {
          const editor = getEditor();
          editor.chain().focus().toggleStrike().run();
          updateActive();
        }}>
        <div class="i-material-symbols:strikethrough-s"></div>
      </button>
      <button
        class="ud-bm-code"
        onClick={() => {
          const editor = getEditor();
          editor.chain().focus().toggleCode().run();
          updateActive();
        }}>
        <div class="i-material-symbols:code"></div>
      </button>
      <button
        class="ud-bm-link"
        onClick={() => {
          const editor = getEditor();
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
          } else {
            const result = prompt("Input link");
            if (!result) return;
            editor.chain().focus().setLink({ href: result, target: "_blank", rel: "noreferer" }).run();
            updateActive();
          }
        }}>
        <div class="i-material-symbols:add-link"></div>
      </button>
    </div>
  ) as HTMLElement;
};

export const createBubbleMenuPlugin = (root: HTMLElement, getEditor: () => Editor) => {
  const bubble = createBubbleMenu(getEditor);
  root.appendChild(bubble);
  return BubbleMenu.configure({
    element: bubble,
    shouldShow({ state }) {
      const { selection } = state;
      const { $from, $to } = selection;
      const isEmptyTextBlock = $from.sameParent($to) && $from.parent.isTextblock && !$from.parent.textContent;
      const isCodeBlock = $from.sameParent($to) && $from.parent.type.name === "codeBlock";

      // 不显示 BubbleMenu 的条件：
      // 1. 当前没有任何选中内容（例如光标在空白处）
      // 2. 选区是在 CodeBlock 中
      if (selection.empty || isEmptyTextBlock || isCodeBlock) {
        return false;
      }

      return true;
    },
  });
};
