import * as React from "jsx-dom";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import type { DOMOutputSpec, Node } from "@tiptap/pm/model";
import { hljsDefineVue, hljsDefineHTML } from "./utils/lang";

const all = { ...common, vue: hljsDefineVue, html: hljsDefineHTML };

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

const isReactive = (node: Node) => node.attrs.language === "html" && node.textContent.startsWith("<!-- reactive -->");

const injectHtml = (root: HTMLElement, html: string | undefined) => {
  const iframe = document.createElement("iframe");
  const htmlContent = `<html><head></head><body>${html}</body></html>`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.onload = () => {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) {
      return;
    }
    doc.open();
    doc.write(htmlContent);
    doc.close();
  };
  root.replaceChildren(iframe);
};

export const hydrate = () => {
  return `<script type="module">const injectHtml = (root, html) => {
  const iframe = document.createElement("iframe");
  const htmlContent = \`<html><head></head><body>\${html}</body></html>\`;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.onload = () => {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) {
      return;
    }
    doc.open();
    doc.write(htmlContent);
    doc.close();
  };
  root.replaceChildren(iframe);
}
  document.querySelectorAll('.playground')?.forEach(el=>{
    const html = el.getAttribute('data-html');
    if (html) {
      injectHtml(el,html);
    }
    const indicator = document.createElement("div");
    indicator.className = "indicator";
    const showCode = document.createElement("div");
    showCode.className = "show-code";
    showCode.innerText = "code";
    showCode.onclick = () => {
      el.parentElement.classList.remove("preview-only");
    };
    const showPreview = document.createElement("div");
    showPreview.className = "show-preview";
    showPreview.innerText = "preview";
    showPreview.onclick = () => {
      el.parentElement.classList.add("preview-only");
    };
    indicator.appendChild(showCode);
    indicator.appendChild(showPreview);
    el.parentElement.appendChild(indicator);
    if (window.screen.width < 768) {
      showPreview.click();
    }
  });</script>`;
};

export const createLowlightCodePlugin = () => {
  const lowlight = createLowlight(all);

  return CodeBlockLowlight.extend({
    addNodeView() {
      const initialLang = null;
      const contentDOM = (
        <pre class="not-draggable">
          <code></code>
        </pre>
      ) as HTMLElement;
      const select = (
        <select contentEditable="false" value={initialLang as any} class="language">
          <option value={undefined} disabled></option>
          <option value={null as any}>auto</option>
          {lowlight.listLanguages().map((lang) => (
            <option value={lang}>{lang}</option>
          ))}
        </select>
      ) as HTMLSelectElement;
      const playground = (<div class="playground" contentEditable={false}></div>) as HTMLElement;
      const dom = (
        <div class="llt-code">
          {select}
          <div class="wrapper">
            {contentDOM}
            {playground}
          </div>
        </div>
      ) as HTMLElement;
      const onUpdate = (newNode: any) => {
        const text = newNode.textContent;
        if (isReactive(newNode)) {
          playground.style.display = "block";
          injectHtml(playground, text);
        } else {
          playground.style.display = "none";
          injectHtml(playground, undefined);
        }
        return true;
      };

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

        onUpdate(ctx.node);
        return {
          dom,
          contentDOM,
          destroy: onDestroy,
          update: onUpdate,
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
          return lowlight.highlight(lang, content);
        } catch (error) {
          console.error(`highlight ${lang} failed:`, error);
          return lowlight.highlight("text", content);
        }
      };
      const gen = lang ? highlight(lang, node.textContent) : lowlight.highlightAuto(node.textContent);
      const result: DOMOutputSpec = [
        "div",
        { className: "llt-code readonly" },
        ["div", { className: "language" }, gen.data?.language ?? lang ?? "auto"],
        [
          "div",
          { className: "wrapper" },
          ["pre", {}, transformToNodes(gen as any, lang)],
          isReactive(node) ? ["div", { className: "playground", "data-html": node.textContent }] : "",
        ],
      ];
      return result;
    },
  }).configure({ lowlight });
};
