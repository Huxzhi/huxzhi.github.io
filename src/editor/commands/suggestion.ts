import tippy, { type Instance, type Props } from "tippy.js";
import { createMenu } from "./menu.tsx";
import { Editor } from "@tiptap/core";
import { pickFile } from "./dialog";

export default {
  items: ({ query }: any) => {
    return [
      {
        title: "Heading 1",
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
        },
      },
      {
        title: "Heading 2",
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
        },
      },
      {
        title: "Heading 3",
        command: ({ editor, range }: any) => {
          editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
        },
      },
      {
        title: "CodeBlock",
        command: ({ editor, range }: any) => {
          (editor as Editor).chain().focus().deleteRange(range).setCodeBlock().run();
        },
      },
      {
        title: "Quote",
        command: ({ editor, range }: any) => {
          (editor as Editor).chain().focus().deleteRange(range).setBlockquote().run();
        },
      },
      {
        title: "Task",
        command: ({ editor, range }: any) => {
          (editor as Editor).chain().focus().deleteRange(range).toggleTaskList().run();
        },
      },
      {
        title: "Image",
        command: async ({ editor, range }: any) => {
          // const url = prompt("entre image url")
          const files = await pickFile();
          if (!files) return;
          [...files].forEach((file) => {
            const url = URL.createObjectURL(file);
            (editor as Editor).chain().focus().deleteRange(range).setImage({ src: url, alt: file.name }).run();
          });
          //   if (url === null) return;
          //   (editor as Editor).chain().focus().deleteRange(range).setImage({ src: url }).run();
        },
      },
    ]
      .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 10);
  },

  render: () => {
    let component: ReturnType<typeof createMenu>;
    let popup: Instance<Props>[] | undefined;

    return {
      onStart: (props: any) => {
        // component = new VueRenderer(CommandsList, {
        //     // using vue 2:
        //     // parent: this,
        //     // propsData: props,
        //     props,
        //     editor: props.editor,
        // })
        component = createMenu(props);
        if (!props.clientRect) {
          return;
        }

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.dom,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup?.[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === "Escape") {
          popup?.[0].hide();

          return true;
        }

        return component?.onKeyDown(props);
      },

      onExit() {
        popup?.[0].destroy();
        component.destroy();
      },
    };
  },
};
