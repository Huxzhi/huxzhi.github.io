import * as React from "jsx-dom";

import { EditorView } from "@tiptap/pm/view";
import { TextSelection } from "@tiptap/pm/state";
import { NodeRange } from "@tiptap/pm/model";
import { toFilename } from "@/shared/transform";
import tippy from "tippy.js";

export const createFrontMenu = (view: EditorView, getCurrentNode: () => Element | undefined) => {
  const onClickAdd = () => {
    const currentNode = getCurrentNode();
    if (!currentNode) return;
    const { state, dispatch } = view;
    const { tr } = state;
    const currentPosition = view.posAtDOM(currentNode, 0);
    const node = state.doc.nodeAt(currentPosition);
    if (!node) return;
    const endPos = currentPosition + node.nodeSize;
    // 创建一个新的段落节点
    const newParagraph = state.schema.nodes.paragraph.create({}, state.schema.text("/"));

    const newSelectionPos = endPos + newParagraph.nodeSize;
    let transaction = tr.insert(endPos, newParagraph);

    transaction = transaction.setSelection(TextSelection.create(transaction.doc, newSelectionPos));

    // 执行变更
    dispatch(transaction);
    view.focus();
  };

  let lastCPosition: number | undefined;
  const onMouseover = (_e: MouseEvent) => {
    lastCPosition = undefined;
  };
  const panel = (
    <div data-drag-handle data-front-handle class="ud-wrapper front-handle-menu">
      {handleMenu.map((v) => (
        <button
          class="px-2 py-1"
          data-drag-handle
          data-front-handle
          onClick={() => {
            const { state } = view;
            const currentPosition = (() => {
              if (lastCPosition !== undefined) {
                return lastCPosition;
              }
              const currentNode = getCurrentNode();
              if (!currentNode) return;

              const pos = view.posAtDOM(currentNode, 0);
              const node = state.doc.nodeAt(pos);
              if (!node) return;
              lastCPosition = pos;
              return pos;
            })();
            if (!currentPosition) return;
            v.command({ view, position: currentPosition });
            // // 替换节点为 heading
            // tr.setNodeMarkup(currentPosition - 1, state.schema.nodes.heading, { level: i + 1 });
            // // 应用更改
            // view.dispatch(tr);
          }}>
          {v.title}
        </button>
      ))}
    </div>
  );

  const dragHandle = (
    <button class="drag-handle" data-drag-handle data-front-handle onMouseOver={onMouseover}>
      <div data-front-handle class="i-ri:draggable"></div>
    </button>
  ) as HTMLElement;
  const menu = (
    <div class="ud-wrapper front-handle" data-front-handle draggable="true">
      <button data-front-handle onClick={onClickAdd}>
        <div data-front-handle class="i-ri:add-line"></div>
      </button>
      {dragHandle}
    </div>
  ) as HTMLElement;
  const tip = tippy(dragHandle, {
    content: panel,
    getReferenceClientRect: () => dragHandle.getBoundingClientRect(),
    trigger: "click",
    interactive: true,
    placement: "bottom-start",
  });
  const ob = new MutationObserver((v) => {
    if (v.every((x) => x.attributeName !== "style")) {
      return;
    }
    tip.hide();
    tip.setProps({ getReferenceClientRect: () => dragHandle.getBoundingClientRect() });
  });
  ob.observe(menu, { attributes: true, subtree: false });
  return menu;
};

const handleMenu = [
  {
    title: "Heading 1",
    command: ({ view, position }: { view: EditorView; position: number }) => {
      const { state } = view;
      const { tr, schema } = state;
      const { heading } = schema.nodes;
      const nodes = getNodesUntilNextParagraph(view, position);
      if (!heading) {
        console.error("heading node is not defined in the schema.");
        return;
      }

      // 获取当前节点内容
      const node = state.doc.nodeAt(position);
      console.log(node, "mod");
      if (!node) return;
      const content = nodes.textContent;
      const size = nodes.nodeSize;

      const newBlockquote = heading.create({ level: 1, id: toFilename(content) }, [schema.text(content)]);

      // 替换为合法的 blockquote 结构
      tr.replaceWith(position - 1, position - 1 + size, newBlockquote);

      view.dispatch(tr);
      console.log("change success");
    },
  },
  {
    title: "Heading 2",
    command: ({ view, position }: { view: EditorView; position: number }) => {
      const { state } = view;
      const { tr, schema } = state;
      const { heading } = schema.nodes;
      const nodes = getNodesUntilNextParagraph(view, position);

      if (!heading) {
        console.error("heading node is not defined in the schema.");
        return;
      }

      // 获取当前节点内容
      const node = state.doc.nodeAt(position);
      if (!node) return;
      const content = nodes.textContent;
      const size = nodes.nodeSize;

      const newBlockquote = heading.create({ level: 2, id: toFilename(content) }, [schema.text(content)]);

      // 替换为合法的 blockquote 结构
      tr.replaceWith(position - 1, position - 1 + size, newBlockquote);

      view.dispatch(tr);
    },
  },
  {
    title: "Heading 3",
    command: ({ view, position }: { view: EditorView; position: number }) => {
      const { state } = view;
      const { tr, schema } = state;
      const { heading } = schema.nodes;
      const nodes = getNodesUntilNextParagraph(view, position);

      if (!heading) {
        console.error("heading node is not defined in the schema.");
        return;
      }

      // 获取当前节点内容
      const node = state.doc.nodeAt(position);
      if (!node) return;
      const content = nodes.textContent;
      const size = nodes.nodeSize;

      const newBlockquote = heading.create({ level: 3, id: toFilename(content) }, [schema.text(content)]);

      // 替换为合法的 blockquote 结构
      tr.replaceWith(position - 1, position - 1 + size, newBlockquote);

      view.dispatch(tr);
    },
  },
  {
    title: "Quote",
    command: ({ view, position }: { view: EditorView; position: number }) => {
      const { state } = view;
      const { tr, schema } = state;
      const { blockquote, paragraph } = schema.nodes;
      const nodes = getNodesUntilNextParagraph(view, position);

      if (!blockquote || !paragraph) {
        console.error("Blockquote or paragraph node is not defined in the schema.");
        return;
      }

      // 获取当前节点内容
      const node = state.doc.nodeAt(position);
      if (!node) return;
      const content = nodes.content;
      const size = content.size;

      const newBlockquote = blockquote.create({}, [paragraph.create({}, content)]);

      // 替换为合法的 blockquote 结构
      tr.replaceWith(position - 1, position + size, newBlockquote);

      view.dispatch(tr);
    },
  },
];

function getNodesUntilNextParagraph(view: EditorView, startPos: number) {
  const { state } = view;
  const { doc } = state;

  // 解析起点位置
  const resolvedPos = doc.resolve(startPos);

  // 起始父节点及其内容
  // const startBlock = resolvedPos.node(resolvedPos.depth);
  const startOffset = resolvedPos.start(resolvedPos.depth);

  // 找到目标范围
  let endPos = startOffset;
  doc.nodesBetween(startPos, doc.content.size, (node, pos) => {
    if (node.type.name === "paragraph" && pos > startPos) {
      // 找到下一个段落节点，停止
      endPos = pos;
      return false;
    }
  });

  // 创建一个范围
  const range = new NodeRange(doc.resolve(startPos), doc.resolve(endPos), resolvedPos.depth);

  // const nodes = range.parent.content

  return range.parent;
}
