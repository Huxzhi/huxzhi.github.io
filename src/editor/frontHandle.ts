import { Extension } from '@tiptap/core'
import { Fragment, Node, Slice } from '@tiptap/pm/model'
import {
  NodeSelection,
  Plugin,
  PluginKey,
  TextSelection,
} from '@tiptap/pm/state'

import { EditorView } from '@tiptap/pm/view'
import { DOMSerializer } from 'prosemirror-model'
import { createFrontMenu } from './frontMenu.tsx'

export interface GlobalFrontHandleOptions {
  /**
   * The width of the drag handle
   */
  handleWidth: number

  /**
   * The treshold for scrolling
   */
  scrollTreshold: number

  /*
   * The css selector to query for the drag handle. (eg: '.custom-handle').
   * If handle element is found, that element will be used as drag handle. If not, a default handle will be created
   */
  dragHandleSelector?: string
  liPreWidth?: number
}
function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect()
  const modal = node.closest('[role="dialog"]')

  if (modal && window.getComputedStyle(modal).transform !== 'none') {
    const modalRect = modal.getBoundingClientRect()

    return {
      top: data.top - modalRect.top,
      left: data.left - modalRect.left,
      width: data.width,
    }
  }
  return {
    top: data.top,
    left: data.left,
    width: data.width,
  }
}

function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: Element) =>
        elem.parentElement?.matches?.('.ProseMirror') ||
        elem.matches(
          [
            'li',
            'p:not(:first-child)',
            'pre',
            'blockquote',
            'h1, h2, h3, h4, h5, h6',
          ].join(', '),
        ),
    )
}

function nodePosAtDOM(
  node: Element,
  view: EditorView,
  options: GlobalFrontHandleOptions,
) {
  const boundingRect = node.getBoundingClientRect()

  return view.posAtCoords({
    left: boundingRect.left + 50 + options.handleWidth,
    top: boundingRect.top + 1,
  })?.inside
}

function calcNodePos(pos: number, view: EditorView) {
  const $pos = view.state.doc.resolve(pos)
  if ($pos.depth > 1) return $pos.before($pos.depth)
  return pos
}

export function DragHandlePlugin(
  options: GlobalFrontHandleOptions & { pluginKey: string },
) {
  let listType = ''
  function handleDragStart(event: DragEvent, view: EditorView) {
    view.focus()

    if (!event.dataTransfer) return

    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + options.handleWidth,
      y: event.clientY,
    })

    if (!(node instanceof Element)) return

    let draggedNodePos = nodePosAtDOM(node, view, options)
    if (draggedNodePos == null || draggedNodePos < 0) return
    draggedNodePos = calcNodePos(draggedNodePos, view)

    const { from, to } = view.state.selection
    const diff = from - to

    const fromSelectionPos = calcNodePos(from, view)
    let differentNodeSelected = false

    const nodePos = view.state.doc.resolve(fromSelectionPos)

    // Check if nodePos points to the top level node
    if (nodePos.node().type.name === 'doc') differentNodeSelected = true
    else {
      const nodeSelection = NodeSelection.create(
        view.state.doc,
        nodePos.before(),
      )

      // Check if the node where the drag event started is part of the current selection
      differentNodeSelected = !(
        draggedNodePos + 1 >= nodeSelection.$from.pos &&
        draggedNodePos <= nodeSelection.$to.pos
      )
    }
    let selection = view.state.selection
    if (
      !differentNodeSelected &&
      diff !== 0 &&
      !(view.state.selection instanceof NodeSelection)
    ) {
      const endSelection = NodeSelection.create(view.state.doc, to - 1)
      selection = TextSelection.create(
        view.state.doc,
        draggedNodePos,
        endSelection.$to.pos,
      )
    } else {
      selection = NodeSelection.create(view.state.doc, draggedNodePos)

      // select complete table instead of just a row
      if ((selection as NodeSelection).node.type.name === 'tableRow') {
        const $pos = view.state.doc.resolve(selection.from)
        selection = NodeSelection.create(view.state.doc, $pos.before())
      }
    }
    view.dispatch(view.state.tr.setSelection(selection))

    // If the selected node is a list item, we need to save the type of the wrapping list e.g. OL or UL
    if (
      view.state.selection instanceof NodeSelection &&
      view.state.selection.node.type.name === 'listItem'
    ) {
      listType = node.parentElement!.tagName
    }

    const slice = view.state.selection.content()
    const serializer = DOMSerializer.fromSchema(view.state.schema)

    // 创建一个容器 DOM 节点
    const div = document.createElement('div')

    slice.content.forEach((node) => {
      const dom = serializer.serializeNode(node)
      div.appendChild(dom)
    })

    // 转换为 HTML 和纯文本
    const html = div.innerHTML
    const text = div.textContent ?? ''

    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/html', html)
    event.dataTransfer.setData('text/plain', text)
    event.dataTransfer.effectAllowed = 'copyMove'

    event.dataTransfer.setDragImage(node, 0, 0)

    view.dragging = { slice, move: event.ctrlKey }
  }

  let dragHandleElement: HTMLElement | null = null
  let currentNode: Element | undefined = undefined

  function hideDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.add('hide')
    }
  }

  function showDragHandle() {
    if (dragHandleElement) {
      dragHandleElement.classList.remove('hide')
    }
  }

  function hideHandleOnEditorOut(event: MouseEvent) {
    if (event.target instanceof Element) {
      const isInsideEditor = !!event.target.closest('.tiptap.ProseMirror')
      const isDragHandle =
        !!event.target.attributes.getNamedItem('data-drag-handle')
      const isFrontHandle =
        !!event.target.attributes.getNamedItem('data-front-handle')
      if (isInsideEditor || isDragHandle || isFrontHandle) return
    }
    hideDragHandle()
  }

  return new Plugin({
    key: new PluginKey(options.pluginKey),
    view: (view) => {
      const handleBySelector = options.dragHandleSelector
        ? document.querySelector<HTMLElement>(options.dragHandleSelector)
        : null
      // dragHandleElement = handleBySelector ?? document.createElement('div');
      // dragHandleElement.draggable = true;
      // dragHandleElement.dataset.dragHandle = '';
      // dragHandleElement.classList.add('drag-handle');
      dragHandleElement = createFrontMenu(view, () => currentNode)

      function onDragHandleDragStart(e: DragEvent) {
        handleDragStart(e, view)
      }

      dragHandleElement.addEventListener('dragstart', onDragHandleDragStart)

      function onDragHandleDrag(e: DragEvent) {
        hideDragHandle()
        const scrollY = window.scrollY
        if (e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY - 30, behavior: 'smooth' })
        } else if (window.innerHeight - e.clientY < options.scrollTreshold) {
          window.scrollTo({ top: scrollY + 30, behavior: 'smooth' })
        }
      }

      dragHandleElement.addEventListener('drag', onDragHandleDrag)

      hideDragHandle()

      if (!handleBySelector) {
        view?.dom?.parentElement?.appendChild(dragHandleElement)
      }
      view?.dom?.parentElement?.parentElement?.addEventListener(
        'mouseout',
        hideHandleOnEditorOut,
      )

      return {
        destroy: () => {
          if (!handleBySelector) {
            dragHandleElement?.remove?.()
          }
          dragHandleElement?.removeEventListener('drag', onDragHandleDrag)
          dragHandleElement?.removeEventListener(
            'dragstart',
            onDragHandleDragStart,
          )
          dragHandleElement = null
          view?.dom?.parentElement?.removeEventListener(
            'mouseout',
            hideHandleOnEditorOut,
          )
        },
      }
    },
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!view.editable) {
            return
          }

          const node = nodeDOMAtCoords({
            x: event.clientX + 50 + options.handleWidth,
            y: event.clientY,
          })

          const notDragging = node?.closest('.not-draggable')

          if (
            !(node instanceof Element) ||
            node.matches('ul, ol') ||
            notDragging
          ) {
            hideDragHandle()
            return
          }

          currentNode = node
          const compStyle = window.getComputedStyle(node)
          const parsedLineHeight = parseInt(compStyle.lineHeight, 10)
          const lineHeight = isNaN(parsedLineHeight)
            ? parseInt(compStyle.fontSize) * 1.2
            : parsedLineHeight
          const paddingTop = parseInt(compStyle.paddingTop, 10)

          const rect = absoluteRect(node)

          rect.top += (lineHeight - 24) / 2
          rect.top += paddingTop
          // Li markers
          if (node.matches('ul:not([data-type=taskList]) li, ol li')) {
            rect.left -= options.liPreWidth ?? options.handleWidth
          }
          rect.width = options.handleWidth

          if (!dragHandleElement) return

          dragHandleElement.style.left = `${rect.left - rect.width}px`
          dragHandleElement.style.top = `${rect.top}px`
          showDragHandle()
        },
        keydown: () => {
          hideDragHandle()
        },
        mousewheel: () => {
          hideDragHandle()
        },
        // dragging class is used for CSS
        dragstart: (view) => {
          view.dom.classList.add('dragging')
        },
        drop: (view, event) => {
          view.dom.classList.remove('dragging')
          hideDragHandle()
          let droppedNode: Node | null = null
          const dropPos = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })

          if (!dropPos) return

          if (view.state.selection instanceof NodeSelection) {
            droppedNode = view.state.selection.node
          }
          if (!droppedNode) return

          const resolvedPos = view.state.doc.resolve(dropPos.pos)

          const isDroppedInsideList =
            resolvedPos.parent.type.name === 'listItem'

          // If the selected node is a list item and is not dropped inside a list, we need to wrap it inside <ol> tag otherwise ol list items will be transformed into ul list item when dropped
          if (
            view.state.selection instanceof NodeSelection &&
            view.state.selection.node.type.name === 'listItem' &&
            !isDroppedInsideList &&
            listType == 'OL'
          ) {
            const newList = view.state.schema.nodes.orderedList?.createAndFill(
              null,
              droppedNode,
            )
            const slice = new Slice(Fragment.from(newList), 0, 0)
            view.dragging = { slice, move: event.ctrlKey }
          }
        },
        dragend: (view) => {
          view.dom.classList.remove('dragging')
        },
      },
    },
  })
}

const GlobalFrontHandle = Extension.create({
  name: 'globalDragHandle',

  addOptions() {
    return {
      handleWidth: 68,
      scrollTreshold: 100,
      liPreWidth: 40,
    }
  },

  addProseMirrorPlugins() {
    return [
      DragHandlePlugin({
        pluginKey: 'globalFrontHandle',
        handleWidth: this.options.handleWidth,
        scrollTreshold: this.options.scrollTreshold,
        dragHandleSelector: this.options.dragHandleSelector,
        liPreWidth: this.options.liPreWidth,
      }),
    ]
  },
})

export default GlobalFrontHandle
