import {memo} from 'react'

import {applyHighlights} from './code-highlight'

/**
 * Displays markdown
 */
export const Markdown = memo(function Markdown({src}: {src: string}) {
  const __html = parse(src)
  if (__html.includes('<pre><code')) {
    applyHighlights()
  }
  return <div dangerouslySetInnerHTML={{__html}} />
})

/**
 * Converts a limited markdown subset to JSX
 *
 * - 2Kb zipped, 1kb when bundled with other code
 * - ...is MUCH smaller than any lib I've found
 *
 */
export const parse = (str: string) => {
  const trashgc: string[] = []

  str = str
    .trim()
    .replace(/\n[ \t]+/gm, '\n') // trim indentation
    .replace(/<(\/)?(script|style)>/gim, '&lt;$1$2&gt;') // Encode any script and style tags

  // an array to store the intermediate placeholders
  // Create keys and add chunks to it that we don't want mangle
  const placeholders: [key: string, value: string][] = []

  // code blocks i.e. ```code```
  // transpile and remove before others to prevent interference
  str = str
    .replace(/```/g, 'ỻ') // intermediate placeholder
    .replace(/ỻ([^ỻ\n]*)ỻ/gm, (_, code) => `<code>${code}</code>`)
    .replace(/ỻ(.*)(\n*)([^ỻ]*)ỻ/gm, (_, ...args) => {
      let code = `<code${args[0] ? ` class="language-${args[0]}"` : ''} style="padding-top:0">${
        args[1] + args[2].replace(/&/g, '&amp').replace(/</g, '&lt').replace(/>/g, '&gt')
      }</code>`
      if (code.includes('\n')) {
        code = `<pre>${code}</pre>`
      }
      const key = 'codechunk' + placeholders.length + '$'
      placeholders.push([key, code])
      return key
    })

  str = str
    .replace(/\n\n(\*\*\*+|---*|___*)$/gm, '\n<hr/>') // Horizontal rule/lines, i.e. *** --- ___
    .replace(/^###### (.*$)(\n*)/gm, '<h6>$1</h6>\n')
    .replace(/^##### (.*$)(\n*)/gm, '<h5>$1</h5>\n')
    .replace(/^#### (.*$)(\n*)/gm, '<h4>$1</h4>\n')
    .replace(/^### (.*$)(\n*)/gm, '<h3>$1</h3>\n')
    .replace(/^## (.*$)(\n*)/gm, '<h2>$1</h2>\n')
    .replace(/^# (.*$)(\n*)/gm, '<h1>$1</h1>\n')
    .replace(/^(.*$)\n===+\n\n*/gm, '<h1>$1</h1>\n') // alt h1
    .replace(/^(.*$)\n---+\n\n*/gm, '<h2>$1</h2>\n') // alt h2
    .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>') // blockquotes i.e. '> quote'
    // if a line ends with a space, replace with &nbsp;
    .replace(/ $/gm, '&nbsp;')
    // if a line ends with a space, regular letter or number, add a <br/>
    // .replace(/[\p{L}\p{N}.*-_]$/gu, '<br/>$1')
    .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>') // bold
    .replace(/\*(.*?)\*/gm, '<i>$1</i>') // italic
    .replace(/~~(.*?)~~/gm, '<strike>$1</strike>') // deleted text
    .replace(/!\[(.*?)\]\(([^ ]*)\)/gm, "<img alt='$1' src='$2' />") // images
    .replace(/([^ \n]+@[^. \n]+\.[^ \n]+)/gm, "<a href='mailto:$1'>$1</a>") // emails
    // images
    .replace(
      /!\[(.*?)\]\(([^ ]*)( [('"][^)'"]+[)'"])*\)/gm,
      (_, ...args) =>
        `<img href='${args[1]}'${args[2] ? ` title='${args[2].slice(2, -1)}'` : ''}>${
          args[1]
        }</img>`
    )
    // links
    .replace(
      /\[(.*?)\]\(([^ ]*)( [('"][^)'"]+[)'"])*\)/gm,
      (_, ...args) =>
        `<a href='${args[1]}'${args[2] ? ` title='${args[2].slice(2, -1)}'` : ''}>${args[1]}</a>`
    )
    // reference links
    .replace(/\[([^\]]+)\]\[([^\]]+)\]/gm, (_, ...args) => {
      const refValue = new RegExp('\\[' + args[1] + '\\]: ([^ \n]+)( [^\n]*)?\n', 'gim').exec(str)
      if (refValue !== null) {
        trashgc.push(refValue[0])
        return (
          '<a href="' +
          refValue[1] +
          '"' +
          (refValue[2] ? ` title=${refValue[2].trim().replace(/[()]/g, '"')}` : '') +
          '>' +
          args[0] +
          '</a>'
        )
      } else return _
    })
    // unordered lists i.e. - listitem
    .replace(/\n\n+(- (.*))$/gm, '\n\n<ul>\n$1')
    .replace(/^(- (.*))\n\n/gm, '$1\n</ul>\n\n')
    .replace(/^- (.*)$/gm, '<li>$1</li>')
    // ordered lists i.e. 1. listitem
    .replace(/\n\n+(\d\. (.*))$/gm, '\n\n<ol>\n$1')
    .replace(/^(\d\. (.*))\n\n/gm, '$1\n</ol>\n\n')
    .replace(/^\d\. (.*)$/gm, '<li>$1</li>')

  // Trash collect
  for (const s of trashgc) {
    str = str.replace(s, '')
  }

  str = str
    // Add breaks
    .replace(/\n\n/gm, '\n<br />\n')
    .replace(/([^>$])$/gm, '$1<br />')
    .replace(/(<\/([abi]|strike)>)$/gm, '$1<br />')
    // Remove excessive breaks in a row
    .replace(/\n<br \/>(\n?<br \/>)+/gm, '<br />')

  // Add placeholders back
  for (const [key, value] of placeholders) {
    str = str.replace(key, value)
  }

  // Remove the no-newline character $ from the end lines
  str = str.replace(/\$$/gm, '')

  str = '\n' + str.trim() + '\n'

  return str
}
