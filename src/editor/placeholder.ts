import Placeholder from "@tiptap/extension-placeholder";

export const createPlaceholderPlugin = () =>
  Placeholder.configure({
    placeholder: ({ node }) => {
      // console.log(node)
      if (node.type.name === "heading") {
        return "What’s the title?";
      }
      if (node.type.name === "codeBlock") {
        return "";
      }

      return "Press / to continue";
    },
  });
