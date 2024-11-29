import { toFilename } from "@/shared/transform";
import { mergeAttributes } from "@tiptap/core";
import Heading from "@tiptap/extension-heading";
import type { Node } from "@tiptap/pm/model";

export default Heading.extend({
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

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    const contentId = toFilename(node.textContent);
    return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, id: contentId }), 0];
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const { level, id } = HTMLAttributes;

      const contentDOM = document.createElement(`h${level}`);
      contentDOM.id = id;
      const onUpdate = (newNode: Node) => {
        if (newNode.type !== node.type || newNode.attrs.level !== node.attrs.level) {
          return false;
        }
        const newId = toFilename(newNode.textContent ?? "");

        if (contentDOM.id !== newId) {
          contentDOM.id = newId;
        }
        return true;
      };
      return {
        dom: contentDOM,
        contentDOM: contentDOM,
        update: onUpdate,
      };
    };
  },
});
