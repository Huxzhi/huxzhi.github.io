import type { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { createLowlightCodeSSRPlugin } from "./lowlight";
import { createPlaceholderPlugin } from "./placeholder";

export const getBasicExtensions = () => {
  const CustomDocument = Document.extend({
    content: "heading block*",
  });
  const displayExtension = [
    CustomDocument,
    StarterKit.configure({
      document: false,
      codeBlock: false,
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

export const getBasicSSRExtensions = () => [...getBasicExtensions(), createLowlightCodeSSRPlugin()];

export const getSSRHTML = (json: JSONContent) => {
  const CustomDocument = Document.extend({
    content: "heading block*",
  });
  const displayExtension = [
    CustomDocument,
    StarterKit.configure({
      document: false,
      codeBlock: false,
    }),
    Image,
    Link.configure({
      autolink: false,
    }),
    Underline,
    createLowlightCodeSSRPlugin(),
    createPlaceholderPlugin(),
  ];
  return generateHTML(json, displayExtension);
};
