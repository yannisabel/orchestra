import mermaid from 'mermaid'

let renderCount = 0

const isDarkTheme = () =>
  document.documentElement.classList.contains('orchestra-theme--dark')

const renderDiagram = async (container: HTMLElement) => {
  const source = container.dataset.source ?? ''
  mermaid.initialize({
    startOnLoad: false,
    theme: isDarkTheme() ? 'dark' : 'default',
  })
  const { svg } = await mermaid.render(`mermaid-svg-${renderCount++}`, source)
  container.innerHTML = svg
}

const convertCodeBlocks = () => {
  document
    .querySelectorAll<HTMLElement>('.language-mermaid')
    .forEach((code) => {
      // Storybook wraps the highlighted <pre> and its Copy button in one block element.
      const block = code.closest('pre')?.parentElement
      if (!block) return

      const container = document.createElement('div')
      container.className = 'mermaid-diagram'
      container.dataset.source = code.textContent ?? ''
      block.replaceWith(container)
      void renderDiagram(container)
    })
}

export const refreshMermaidDiagrams = () => {
  document
    .querySelectorAll<HTMLElement>('.mermaid-diagram[data-source]')
    .forEach((container) => void renderDiagram(container))
}

export const initMermaid = () => {
  convertCodeBlocks()
  new MutationObserver(convertCodeBlocks).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}
