import type { Root, Text } from 'mdast'
import { visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

/**
 * Remark plugin to extract hashtags from markdown content
 * and add them to frontmatter tags array
 * Supports nested tags: #parent/child or #category/subcategory/item
 */
export function remarkExtractTags() {
  return (tree: Root, file: VFile) => {
    const tags = new Set<string>()

    // Visit all text nodes in the markdown AST
    visit(tree, 'text', (node: Text) => {
      // Match hashtags: # followed by non-whitespace characters
      // Supports nested tags like #parent/child
      const hashtagRegex = /#([^\s#]+)/g
      let match

      while ((match = hashtagRegex.exec(node.value)) !== null) {
        const tag = match[1]
        if (tag && tag.length > 0) {
          // Add the full tag
          tags.add(tag)

          // If it's a nested tag, also add all parent tags
          // Example: #a/b/c adds "a/b/c", "a/b", and "a"
          if (tag.includes('/')) {
            const parts = tag.split('/')
            for (let i = 1; i < parts.length; i++) {
              const parentTag = parts.slice(0, i).join('/')
              tags.add(parentTag)
            }
          }
        }
      }
    })

    // Add extracted tags to frontmatter if any found
    if (tags.size > 0) {
      if (!file.data.astro) {
        file.data.astro = {}
      }
      if (!file.data.astro.frontmatter) {
        file.data.astro.frontmatter = {}
      }

      // Merge with existing tags from frontmatter
      const existingTags = file.data.astro.frontmatter.tags || []
      const allTags = [...new Set([...existingTags, ...Array.from(tags)])]

      file.data.astro.frontmatter.tags = allTags
    }
  }
}
