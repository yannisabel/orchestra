import { Marked } from 'marked'

const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')

export function renderMarkdown(source: string): string {
  // Tocbot links to headings by id, so each heading needs one.
  const seen = new Map<string, number>()
  const markdown = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens)
        const plain = text.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&')
        const base = slugify(plain) || 'section'
        const count = seen.get(base) ?? 0
        seen.set(base, count + 1)
        const id = count === 0 ? base : `${base}-${count}`
        return `<h${depth} id="${id}">${text}</h${depth}>\n`
      },
    },
  })

  return markdown.parse(source, { async: false })
}
