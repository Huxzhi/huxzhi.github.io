import { type JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";
import Link from "@tiptap/extension-link";
import Document from "@tiptap/extension-document";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Heading from "./heading.ts";
import StarterKit from "@tiptap/starter-kit";
import { createLowlightCodeSSRPlugin, hydrate } from "./lowlight.tsx";
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
      heading: false,
    }),
    Heading,
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
