import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { h } from "./utils/h";
import type { DOMOutputSpec } from "@tiptap/pm/model";
import hljsDefineVue from "./utils/vue";

const all = { ...common, vue: hljsDefineVue };

type Root = { children?: Root[]; tagName: string; properties?: any; type: string; value?: string };
const transformToNodes = (root: Root, lang: string): DOMOutputSpec => {
  if (root.type === "root") {
    return [
      "code",
      { class: lang ? `language-${lang}` : undefined },
      ...(root.children?.map((c) => transformToNodes(c, lang)) ?? []),
    ];
  }
  if (root.type === "text") {
    return root.value ?? "";
  }
  return [
    root.tagName,
    { ...root.properties, class: root.properties?.className },
    ...(root.children?.map((c) => transformToNodes(c, lang)) ?? []),
  ];
};

export const createLowlightCodePlugin = () => {
  const lowlight = createLowlight(all);

  return CodeBlockLowlight.extend({
    addNodeView() {
      const initialLang = null;
      const contentDOM = h("pre", {}, [h("code", {})]);
      const select = h(
        "select",
        {
          contenteditable: false,
          value: initialLang,
          className: "language",
        },
        [
          h("option", { value: undefined, disabled: true }, "select a language"),
          h("option", { value: null }, "auto"),
          ...lowlight.listLanguages().map((lang) => h("option", { value: lang }, lang)),
        ]
      );
      const dom = h("div", { className: "llt-code" }, [select, contentDOM]);
      return (ctx) => {
        select.value = ctx.node.attrs.language;
        const onChange = () => {
          const language = (select as HTMLSelectElement).value as string;
          // ctx.editor.commands.updateAttributes({ language: select.value })
          ctx.editor.view.dispatch(
            ctx.editor.view.state.tr.setNodeMarkup((ctx.getPos as any)(), null, {
              ...ctx.node.attrs,
              language,
            })
          );
        };
        select.addEventListener("change", onChange);
        const onDestroy = () => {
          select.removeEventListener("change", onChange);
        };

        return {
          dom,
          contentDOM,
          destroy: onDestroy,
        };
      };
    },
    addKeyboardShortcuts() {
      return {
        Tab: () => {
          // if (this.editor.isActive("codeBlock")) {
          //     return this.editor.commands.insertContent("\t");
          // }
          // return true
          this.editor.commands.insertContent("\t");
          return true;
        },
      };
    },
  }).configure({
    lowlight,
  });
};

export const createLowlightCodeSSRPlugin = () => {
  const lowlight = createLowlight(all);
  return CodeBlockLowlight.extend({
    renderHTML({ node }) {
      const lang = node.attrs?.language;
      const highlight = (lang: string, content: any) => {
        try {
          return lowlight.highlight(lang, node.textContent);
        } catch (error) {
          console.error(`highlight ${lang} failed:`, error);
          return lowlight.highlight("text", node.textContent);
        }
      };
      const gen = lang ? highlight(lang, node.textContent) : lowlight.highlightAuto(node.textContent);
      const result: DOMOutputSpec = [
        "div",
        { className: "llt-code readonly" },
        ["div", { className: "language" }, gen.data?.language ?? lang ?? "auto"],
        ["pre", {}, transformToNodes(gen as any, lang)],
      ];
      return result;
    },
  }).configure({ lowlight });
};
