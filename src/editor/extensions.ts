import { type JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import StarterKit from "@tiptap/starter-kit";
import { createLowlightCodeSSRPlugin, hydrate } from "./lowlight.tsx";
import { createPlaceholderPlugin } from "./placeholder";
import { toFilename } from "@/shared/transform.ts";
import type { Node } from "@tiptap/pm/model";

export const getBasicExtensions = () => {
  const CustomDocument = Document.extend({
    content: "heading block*",
  });
  const displayExtension = [
    CustomDocument,
    StarterKit.configure({
      document: false,
      codeBlock: false,
      heading: false,
    }),
    Heading.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          id: {
            default: null,
            parseHTML: (element) => {
              const id = element.textContent ? toFilename(element.textContent) : undefined;
              return id;
            },
            renderHTML: (attributes) => {
              return {
                ...attributes,
                id: attributes.id,
              };
            },
          },
        };
      },
      addNodeView() {
        return ({ node, editor, HTMLAttributes, getPos }) => {
          const { level, id } = HTMLAttributes;
          const contentDOM = document.createElement(`h${level}`);
          contentDOM.id = id;
          const updateId = (newNode: Node) => {
            const newId = toFilename(newNode.textContent ?? "");
            if (contentDOM.id !== newId) {
              contentDOM.id = newId;
              const transaction = editor.state.tr;
              transaction.setNodeMarkup(getPos(), undefined, {
                ...newNode.attrs,
                id: newId,
              });
              editor.view.dispatch(transaction);
            }
            return true;
          };
          return {
            dom: contentDOM,
            contentDOM,
            update: (updatedNode) => {
              if (updatedNode.type !== node.type) {
                return false;
              }
              return updateId(updatedNode);
            },
          };
        };
      },
    }),
    Image,
    Link.configure({
      autolink: false,
    }),
    Underline,
    //   ssr ? createLowlightCodeSSRPlugin() : createLowlightCodePlugin(),
    createPlaceholderPlugin(),
  ];
  return displayExtension;
};

export const getSSRHTML = (json: JSONContent) => {
  const displayExtension = [...getBasicExtensions(), createLowlightCodeSSRPlugin()];
  const hydrateReactive = hydrate();
  return generateHTML(json, displayExtension) + hydrateReactive;
};
