import type { Root } from 'hast'
import { visit } from 'unist-util-visit'

/**
 * Rehype plugin to remove the first h1 if it matches the post title from frontmatter
 */
export default function rehypeRemoveDuplicateH1() {
  return (tree: Root, file: any) => {
    // Get title from frontmatter - try multiple possible paths
    const title =
      file.data?.astro?.frontmatter?.title ||
      file.data?.frontmatter?.title ||
      (file as any).frontmatter?.title

    if (!title) {
      console.log('rehype-remove-duplicate-h1: No title found in frontmatter')
      return
    }

    console.log('rehype-remove-duplicate-h1: Processing with title:', title)

    let firstH1Found = false

    visit(tree, 'element', (node, index, parent) => {
      if (!firstH1Found && node.tagName === 'h1') {
        firstH1Found = true

        // Extract text content from h1
        let h1Text = ''
        visit(node, 'text', (textNode) => {
          h1Text += textNode.value
        })

        console.log('rehype-remove-duplicate-h1: Found h1:', h1Text.trim())

        // Remove h1 if it matches the title (case-insensitive, trimmed)
        if (h1Text.trim().toLowerCase() === title.trim().toLowerCase()) {
          console.log('rehype-remove-duplicate-h1: Removing duplicate h1')
          if (parent && typeof index === 'number') {
            parent.children.splice(index, 1)
            return ['skip', index] as const
          }
        }
      }
    })
  }
}
