import * as React from "jsx-dom";
import { mergeAttributes, Node } from "@tiptap/core";

const getId = (() => {
  let i = 0;
  return () => {
    return i;
  };
})();

export const createReactiveHtmlPlugin = () => {
  return Node.create({
    name: "reactiveHtml",

    content: "inline+",

    addAttributes() {
      return {
        html: {
          default: "",
          parseHTML: (element) => element.getAttribute("data-html") || "",
          renderHTML: (attributes) => {
            return {
              "data-html": attributes.html || "",
            };
          },
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: "div[data-type='reactiveHtml']",
        },
      ];
    },

    renderHTML({ HTMLAttributes, node }) {
      return [
        "div",
        mergeAttributes(HTMLAttributes, { "data-type": "reactiveHtml" }, { "data-html": node.textContent }),

        [
          "div",
          {},
          //0, // 0 表示嵌套内容在这里渲染
        ],
        ["div", { class: "reactive-html-playground" }, node.textContent],
      ];
    },

    addNodeView() {
      // 创建 DOM 元素
      const dom = document.createElement("div");
      dom.className = "reactive-html bg-red flex";
      dom.setAttribute("data-type", "reactiveHtml");

      // 内容区域
      const contentDOM = document.createElement("div");
      dom.appendChild(contentDOM);

      // 预览区域
      const playground = document.createElement("div");
      playground.contentEditable = "false";
      playground.className = "reactive-html-playground";
      dom.appendChild(playground);
      return ({ node, getPos, editor }) => {
        playground.innerHTML = node.attrs.html || ""; // 初始填充

        return {
          dom,
          contentDOM,
          update: (updatedNode) => {
            if (updatedNode.type !== node.type) {
              return false;
            }
            // 更新预览内容
            playground.innerHTML = updatedNode.textContent;
            return true;
          },
          destroy: () => {
            // 可在此销毁事件监听等资源
          },
        };
      };
    },
  });
};
