import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Rehype plugin to remove the first h1 if it matches the post title from frontmatter
 */
export default function rehypeRemoveDuplicateH1() {
  return (tree: Root, file: any) => {
    // Get title from frontmatter
    const title = file.data?.astro?.frontmatter?.title
    if (!title) return

    let firstH1Found = false

    visit(tree, 'element', (node, index, parent) => {
      if (!firstH1Found && node.tagName === 'h1') {
        firstH1Found = true

        // Extract text content from h1
        let h1Text = ''
        visit(node, 'text', (textNode) => {
          h1Text += textNode.value
        })

        // Remove h1 if it matches the title (case-insensitive, trimmed)
        if (h1Text.trim().toLowerCase() === title.trim().toLowerCase()) {
          if (parent && typeof index === 'number') {
            parent.children.splice(index, 1)
            return ['skip', index] as const
          }
        }
      }
    })
  }
}
