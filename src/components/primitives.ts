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
  /** A styled 'div' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Box: BoxType
  /** A styled 'div' tag with display=flex, css props and nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Flex: BoxType
  /** A styled 'div' tag with display=flex, flexDirection=col css props and nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var FlexC: BoxType
  /** A styled 'a' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var A: SC<HTP['a']>
  /** A styled 'abbr' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Abbr: SC<HTP['abbr']>
  /** A styled 'address' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Address: SC<HTP['address']>
  /** A styled 'area' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Area: SC<HTP['area']>
  /** A styled 'article' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Article: SC<HTP['article']>
  /** A styled 'aside' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Aside: SC<HTP['aside']>
  /** A styled 'audio' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  // var Audio: SC<HTP['audio']>
  /** A styled 'b' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var B: SC<HTP['b']>
  /** A styled 'blockquote' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Blockquote: SC<HTP['blockquote']>
  /** A styled 'br' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Br: SC<HTP['br']>
  /** A styled 'button' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Button: SC<HTP['button']>
  /** A styled 'caption' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Caption: SC<HTP['caption']>
  /** A styled 'cite' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Cite: SC<HTP['cite']>
  /** A styled 'code' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Code: SC<HTP['code']>
  /** A styled 'col' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Col: SC<HTP['col']>
  /** A styled 'colgroup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Colgroup: SC<HTP['colgroup']>
  /** A styled 'dd' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dd: SC<HTP['dd']>
  /** A styled 'del' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Del: SC<HTP['del']>
  /** A styled 'details' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Details: SC<HTP['details']>
  /** A styled 'dfn' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dfn: SC<HTP['dfn']>
  /** A styled 'dialog' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dialog: SC<HTP['dialog']>
  /** A styled 'div' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Div: BoxType
  /** A styled 'dl' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dl: SC<HTP['dl']>
  /** A styled 'dt' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Dt: SC<HTP['dt']>
  /** A styled 'em' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Em: BoxType
  /** A styled 'embed' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Embed: SC<HTP['embed']>
  /** A styled 'fieldset' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Fieldset: SC<HTP['fieldset']>
  /** A styled 'figcaption' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Figcaption: SC<HTP['figcaption']>
  /** A styled 'figure' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Figure: SC<HTP['figure']>
  /** A styled 'footer' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Footer: SC<HTP['footer']>
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
  /** A styled 'hgroup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Hgroup: SC<HTP['hgroup']>
  /** A styled 'hr' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Hr: SC<HTP['hr']>
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
  /** A styled 'kbd' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Kbd: SC<HTP['kbd']>
  /** A styled 'label' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Label: SC<HTP['label']>
  /** A styled 'legend' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Legend: SC<HTP['legend']>
  /** A styled 'li' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Li: SC<HTP['li']>
  /** A styled 'main' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Main: BoxType
  /** A styled 'map' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  // var Map: SC<HTP['map']>
  /** A styled 'mark' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Mark: SC<HTP['mark']>
  /** A styled 'meter' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Meter: SC<HTP['meter']>
  /** A styled 'nav' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Nav: BoxType
  /** A styled 'object' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  // var Object: SC<HTP['object']>
  /** A styled 'ol' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Ol: SC<HTP['ol']>
  /** A styled 'optgroup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Optgroup: SC<HTP['optgroup']>
  /** A styled 'option' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  // var Option: SC<HTP['option']>
  /** A styled 'output' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Output: SC<HTP['output']>
  /** A styled 'p' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var P: BoxType
  /** A styled 'picture' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Picture: SC<HTP['picture']>
  /** A styled 'pre' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Pre: SC<HTP['pre']>
  /** A styled 'progress' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Progress: SC<HTP['progress']>
  /** A styled 'q' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Q: SC<HTP['q']>
  /** A styled 'rp' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Rp: SC<HTP['rp']>
  /** A styled 'rt' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Rt: SC<HTP['rt']>
  /** A styled 'ruby' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Ruby: SC<HTP['ruby']>
  /** A styled 's' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var S: BoxType
  /** A styled 'samp' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Samp: SC<HTP['samp']>
  /** A styled 'section' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Section: BoxType
  /** A styled 'select' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Select: SC<HTP['select']>
  /** A styled 'small' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Small: SC<HTP['small']>
  /** A styled 'span' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Span: SC<HTP['span']>
  /** A styled 'strong' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var Strong: BoxType
  /** A styled 'sub' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Sub: SC<HTP['sub']>
  /** A styled 'summary' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Summary: SC<HTP['summary']>
  /** A styled 'sup' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Sup: SC<HTP['sup']>
  /** A styled 'table' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Table: SC<HTP['table']>
  /** A styled 'tbody' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Tbody: SC<HTP['tbody']>
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
  /** A styled 'tr' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Tr: SC<HTP['tr']>
  /** A styled 'u' tag with css props and nice styled magic, like zx, _hover, _active, css and style shorthands */
  var U: BoxType
  /** A styled 'ul' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Ul: SC<HTP['ul']>
  /** A styled 'video' tag with nice styled magic, like zx, _hover, _active, css and style shorthands  */
  var Video: SC<HTP['video']>
}

type BoxProps = SCProps &
  SCProps['zx'] & {
    as?: keyof JSX.IntrinsicElements
    children: React.ReactNode
  }
type BoxType = (p: BoxProps) => JSX.Element

const Box = ({
  _active,
  as = 'div',
  children,
  className,
  css,
  _hover,
  id,
  style,
  zx,
  ...rest
}: BoxProps) => {
  return styled(as as unknown as FC<JSX.IntrinsicElements['div']>)``({
    _active,
    children,
    className,
    css,
    _hover,
    id,
    style,
    zx: { ...zx, ...rest },
  })
}

const createBox = (as: keyof JSX.IntrinsicElements) => {
  return (props: BoxProps) => Box({ ...props, as })
}

globalThis.Box = Box

globalThis.Flex = styled(Box)`
  d: flex;
`
globalThis.FlexC = styled(Box)`
  d: flex;
  fd: column;
`

globalThis.A = styled.a``
globalThis.Abbr = styled.abbr``
globalThis.Address = styled.address``
globalThis.Area = styled.area``
globalThis.Article = styled.article``
globalThis.Aside = styled.aside``
// globalThis.Audio = styled.audio``
globalThis.B = styled.b``
globalThis.Blockquote = styled.blockquote``
globalThis.Br = styled.br``
globalThis.Button = styled.button``
globalThis.Caption = styled.caption``
globalThis.Cite = styled.cite``
globalThis.Code = styled.code``
globalThis.Col = styled.col``
globalThis.Colgroup = styled.colgroup``
globalThis.Dd = styled.dd``
globalThis.Del = styled.del``
globalThis.Details = styled.details``
globalThis.Dfn = styled.dfn``
globalThis.Dialog = styled.dialog``
globalThis.Div = Box
globalThis.Dl = styled.dl``
globalThis.Dt = styled.dt``
globalThis.Em = createBox('em')
globalThis.Embed = styled.embed``
globalThis.Fieldset = styled.fieldset``
globalThis.Figcaption = styled.figcaption``
globalThis.Figure = styled.figure``
globalThis.Footer = styled.footer``
globalThis.Form = styled.form``
globalThis.H1 = createBox('h1')
globalThis.H2 = createBox('h2')
globalThis.H3 = createBox('h3')
globalThis.H4 = createBox('h4')
globalThis.H5 = createBox('h5')
globalThis.H6 = createBox('h6')
globalThis.Header = createBox('header')
globalThis.Hgroup = styled.hgroup``
globalThis.Hr = styled.hr``
globalThis.I = createBox('i')
globalThis.Iframe = styled.iframe``
globalThis.Img = styled.img``
globalThis.Input = styled.input``
globalThis.Ins = styled.ins``
globalThis.Kbd = styled.kbd``
globalThis.Label = styled.label``
globalThis.Legend = styled.legend``
globalThis.Li = styled.li``
globalThis.Main = createBox('main')
// globalThis.Map = styled.map``
globalThis.Mark = styled.mark``
globalThis.Meter = styled.meter``
globalThis.Nav = createBox('nav')
// globalThis.Object = styled.object``
globalThis.Ol = styled.ol``
globalThis.Optgroup = styled.optgroup``
// globalThis.Option = styled.option``
globalThis.Output = styled.output``
globalThis.P = createBox('p')
globalThis.Picture = styled.picture``
globalThis.Pre = styled.pre``
globalThis.Progress = styled.progress``
globalThis.Q = styled.q``
globalThis.Rp = styled.rp``
globalThis.Rt = styled.rt``
globalThis.Ruby = styled.ruby``
globalThis.S = createBox('s')
globalThis.Samp = styled.samp``
globalThis.Section = createBox('section')
globalThis.Select = styled.select``
globalThis.Small = styled.small``
globalThis.Span = styled.span``
globalThis.Strong = createBox('strong')
globalThis.Sub = styled.sub``
globalThis.Summary = styled.summary``
globalThis.Sup = styled.sup``
globalThis.Table = styled.table``
globalThis.Tbody = styled.tbody``
globalThis.Td = styled.td``
globalThis.Textarea = styled.textarea``
globalThis.Tfoot = styled.tfoot``
globalThis.Th = styled.th``
globalThis.Thead = styled.thead``
globalThis.Time = styled.time``
globalThis.Tr = styled.tr``
globalThis.U = createBox('u')
globalThis.Ul = styled.ul``
globalThis.Video = styled.video``
