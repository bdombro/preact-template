/* eslint-disable no-var */
import { FC } from 'react'
import { SC } from '@ustyle/styled'
import { SCProps } from '@ustyle/styled'
// @ts-expect-error - ts can't resolve withHtmlTags without moduleResolute>="node16"
import styled from '@ustyle/styled/withHtmlTags'

// You must export something or TS gets confused.
export {}

/** Shorthand type */
type HTP = JSX.IntrinsicElements
declare global {
  /** A styled 'div' tag with display=flex, css props and nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Flex: BoxType
  /** A styled 'div' tag with display=flex, flexDirection=col css props and nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var FlexC: BoxType
  /** A styled 'a' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var A: SC<HTP['a']>
  /** A styled 'abbr' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Abbr: BoxType
  /** A styled 'abbr' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Address: BoxType
  /** A styled 'area' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Area: SC<HTP['area']>
  /** A styled 'article' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Article: BoxType
  /** A styled 'aside' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Aside: BoxType
  /** A styled 'audio' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var AudioC: SC<HTP['audio']>
  /** A styled 'b' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var B: BoxType
  /** A styled 'blockquote' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Blockquote: SC<HTP['blockquote']>
  /** A styled 'br' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Br: BoxType
  /** A styled 'button' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Button: SC<
    Omit<HTP['button'], 'id' | 'type'> & {
      id: JSX.IntrinsicElements['button']['id'] // make required
      type: JSX.IntrinsicElements['button']['type'] // make required
    }
  >
  /** A styled 'caption' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Caption: BoxType
  /** A styled 'cite' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Cite: BoxType
  /** A styled 'code' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Code: BoxType
  /** A styled 'col' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Col: SC<HTP['col']>
  /** A styled 'colgroup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Colgroup: SC<HTP['colgroup']>
  /** A styled 'dd' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Dd: BoxType
  /** A styled 'del' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Del: SC<HTP['del']>
  /** A styled 'details' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Details: SC<HTP['details']>
  /** A styled 'dfn' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Dfn: BoxType
  /** A styled 'dialog' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dialog: SC<HTP['dialog']>
  /** A styled 'div' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Div: BoxType
  /** A styled 'dl' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Dl: BoxType
  /** A styled 'dt' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Dt: BoxType
  /** A styled 'em' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Em: BoxType
  /** A styled 'embed' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Embed: SC<HTP['embed']>
  /** A styled 'fieldset' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Fieldset: SC<HTP['fieldset']>
  /** A styled 'figcaption' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Figcaption: BoxType
  /** A styled 'figure' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Figure: BoxType
  /** A styled 'footer' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Footer: BoxType
  /** A styled 'form' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Form: SC<HTP['form']>
  /** A styled 'h1' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H1: BoxType
  /** A styled 'h2' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H2: BoxType
  /** A styled 'h3' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H3: BoxType
  /** A styled 'h4' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H4: BoxType
  /** A styled 'h5' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H5: BoxType
  /** A styled 'h6' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var H6: BoxType
  /** A styled 'header' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Header: BoxType
  /** A styled 'hgroup' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Hgroup: BoxType
  /** A styled 'hr' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Hr: BoxType
  /** A styled 'i' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var I: BoxType
  /** A styled 'iframe' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Iframe: SC<HTP['iframe']>
  /** A styled 'img' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Img: SC<HTP['img']>
  /** A styled 'input' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Input: SC<HTP['input']>
  /** A styled 'ins' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Ins: SC<HTP['ins']>
  /** A styled 'kbd' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Kbd: BoxType
  /** A styled 'label' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Label: SC<HTP['label']>
  /** A styled 'legend' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Legend: BoxType
  /** A styled 'li' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Li: SC<HTP['li']>
  /** A styled 'main' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Main: BoxType
  /** A styled 'map' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var MapC: SC<HTP['map']>
  /** A styled 'mark' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Mark: BoxType
  /** A styled 'meter' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Meter: SC<HTP['meter']>
  /** A styled 'nav' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Nav: BoxType
  /** A styled 'object' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var ObjectC: SC<HTP['object']>
  /** A styled 'ol' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Ol: SC<HTP['ol']>
  /** A styled 'optgroup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Optgroup: SC<HTP['optgroup']>
  /** A styled 'option' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var OptionC: SC<HTP['option']>
  /** A styled 'output' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Output: SC<HTP['output']>
  /** A styled 'p' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var P: BoxType
  /** A styled 'Picture' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Picture: BoxType
  /** A styled 'pre' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Pre: BoxType
  /** A styled 'progress' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Progress: SC<HTP['progress']>
  /** A styled 'q' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Q: SC<HTP['q']>
  /** A styled 'rp' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Rp: BoxType
  /** A styled 'rt' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Rt: BoxType
  /** A styled 'ruby' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Ruby: BoxType
  /** A styled 's' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var S: BoxType
  /** A styled 'samp' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Samp: BoxType
  /** A styled 'section' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Section: BoxType
  /** A styled 'select' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Select: SC<HTP['select']>
  /** A styled 'small' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Small: BoxType
  /** A styled 'span' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Span: BoxType
  /** A styled 'strong' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Strong: BoxType
  /** A styled 'sub' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Sub: BoxType
  /** A styled 'summary' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Summary: BoxType
  /** A styled 'sup' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Sup: BoxType
  /** A styled 'table' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Table: SC<HTP['table']>
  /** A styled 'tbody' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Tbody: BoxType
  /** A styled 'td' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Td: SC<HTP['td']>
  /** A styled 'textarea' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Textarea: SC<HTP['textarea']>
  /** A styled 'tfoot' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Tfoot: SC<HTP['tfoot']>
  /** A styled 'th' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Th: SC<HTP['th']>
  /** A styled 'thead' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Thead: SC<HTP['thead']>
  /** A styled 'time' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Time: SC<HTP['time']>
  /** A styled 'tr' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Tr: BoxType
  /** A styled 'u' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var U: BoxType
  /** A styled 'ul' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Ul: BoxType
  /** A styled 'video' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Video: SC<HTP['video']>
}

type BoxProps = JSX.IntrinsicElements['div'] &
  SCProps &
  SCProps['zx'] & {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
    extraPassthroughKeys?: string[]
  }
type BoxType = (p: BoxProps) => JSX.Element
const boxPassthroughKeys: (keyof Omit<BoxProps, 'as' | 'zx'>)[] = [
  '_active',
  'children',
  'css',
  '_hover',
  'accessKey',
  'className',
  'contentEditable',
  'contextMenu',
  'dir',
  'draggable',
  'hidden',
  'id',
  'lang',
  'nonce',
  'placeholder',
  'ref',
  'slot',
  'spellCheck',
  'style',
  'tabIndex',
  'title',
  'translate',
  'role',
]
function Box({ as = 'div', zx, ...rest }: BoxProps) {
  return styled(as as unknown as FC<JSX.IntrinsicElements['div']>)``({
    ...boxPassthroughKeys.reduce((acc, key) => {
      if (
        rest[key] ||
        key.startsWith('aria') ||
        key.startsWith('data') ||
        key.startsWith('on')
      ) {
        acc[key] = rest[key]
        delete rest[key]
      }
      return acc
    }, {} as BoxProps),
    zx: { ...zx, ...rest },
  })
}

function createBox<As extends keyof JSX.IntrinsicElements>(as: As) {
  return (props: BoxProps) => Box({ ...props, as })
}

globalThis.Flex = styled(Box)`
  d: flex;
`
globalThis.FlexC = styled(Box)`
  d: flex;
  fd: column;
`

globalThis.A = styled.a``
globalThis.Abbr = createBox('abbr')
globalThis.Address = createBox('address')
globalThis.Area = styled.area``
globalThis.Article = createBox('article')
globalThis.Aside = createBox('aside')
globalThis.AudioC = styled.audio``
globalThis.B = createBox('b')
globalThis.Blockquote = styled.blockquote``
globalThis.Br = createBox('br')
globalThis.Button = styled.button``
globalThis.Caption = createBox('caption')
globalThis.Cite = createBox('cite')
globalThis.Code = createBox('code')
globalThis.Col = styled.col``
globalThis.Colgroup = styled.colgroup``
globalThis.Dd = createBox('dd')
globalThis.Del = styled.del``
globalThis.Details = styled.details``
globalThis.Dfn = createBox('dfn')
globalThis.Dialog = styled.dialog``
globalThis.Div = Box
globalThis.Dl = createBox('dl')
globalThis.Dt = createBox('dt')
globalThis.Em = createBox('em')
globalThis.Embed = styled.embed``
globalThis.Fieldset = styled.fieldset``
globalThis.Figcaption = createBox('figcaption')
globalThis.Figure = createBox('figure')
globalThis.Footer = createBox('footer')
globalThis.Form = styled.form``
globalThis.H1 = createBox('h1')
globalThis.H2 = createBox('h2')
globalThis.H3 = createBox('h3')
globalThis.H4 = createBox('h4')
globalThis.H5 = createBox('h5')
globalThis.H6 = createBox('h6')
globalThis.Header = createBox('header')
globalThis.Hgroup = createBox('hgroup')
globalThis.Hr = createBox('hr')
globalThis.I = createBox('i')
globalThis.Iframe = styled.iframe``
globalThis.Img = styled.img``
globalThis.Input = styled.input``
globalThis.Ins = styled.ins``
globalThis.Kbd = createBox('kbd')
globalThis.Label = styled.label``
globalThis.Legend = createBox('legend')
globalThis.Li = styled.li``
globalThis.Main = createBox('main')
globalThis.MapC = styled.map``
globalThis.Mark = createBox('mark')
globalThis.Meter = styled.meter``
globalThis.Nav = createBox('nav')
globalThis.ObjectC = styled.object``
globalThis.Ol = styled.ol``
globalThis.Optgroup = styled.optgroup``
globalThis.OptionC = styled.option``
globalThis.Output = styled.output``
globalThis.P = createBox('p')
globalThis.Picture = createBox('picture')
globalThis.Pre = createBox('pre')
globalThis.Progress = styled.progress``
globalThis.Q = styled.q``
globalThis.Rp = createBox('rp')
globalThis.Rt = createBox('rt')
globalThis.Ruby = createBox('ruby')
globalThis.S = createBox('s')
globalThis.Samp = createBox('samp')
globalThis.Section = createBox('section')
globalThis.Select = styled.select``
globalThis.Small = createBox('small')
globalThis.Span = createBox('span')
globalThis.Strong = createBox('strong')
globalThis.Sub = createBox('sub')
globalThis.Summary = createBox('summary')
globalThis.Sup = createBox('sup')
globalThis.Table = styled.table``
globalThis.Tbody = createBox('tbody')
globalThis.Td = styled.td``
globalThis.Textarea = styled.textarea``
globalThis.Tfoot = styled.tfoot``
globalThis.Th = styled.th``
globalThis.Thead = styled.thead``
globalThis.Time = styled.time``
globalThis.Tr = createBox('tr')
globalThis.U = createBox('u')
globalThis.Ul = createBox('ul')
globalThis.Video = styled.video``
