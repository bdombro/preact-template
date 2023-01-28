/* eslint-disable no-var */
import { SC } from '@ustyle/styled'
// @ts-expect-error - ts can't resolve withHtmlTags without moduleResolute>="node16"
import styled from '@ustyle/styled/withHtmlTags'

// You must export something or TS gets confused.
export {}

/** Shorthand type */
type HTP = JSX.IntrinsicElements

declare global {
  /** A styled 'a' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var A: SC<HTP['a']>
  /** A styled 'abbr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Abbr: SC<HTP['abbr']>
  /** A styled 'address' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Address: SC<HTP['address']>
  /** A styled 'area' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Area: SC<HTP['area']>
  /** A styled 'article' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Article: SC<HTP['article']>
  /** A styled 'aside' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Aside: SC<HTP['aside']>
  /** A styled 'audio' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var AudioC: SC<HTP['audio']>
  /** A styled 'b' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var B: SC<HTP['b']>
  /** A styled 'blockquote' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Blockquote: SC<HTP['blockquote']>
  /** A styled 'br' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Br: SC<HTP['br']>
  /** A styled 'button' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Button: SC<HTP['button']>
  /** A styled 'caption' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Caption: SC<HTP['caption']>
  /** A styled 'cite' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Cite: SC<HTP['cite']>
  /** A styled 'code' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Code: SC<HTP['code']>
  /** A styled 'col' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Col: SC<HTP['col']>
  /** A styled 'colgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Colgroup: SC<HTP['colgroup']>
  /** A styled 'dd' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dd: SC<HTP['dd']>
  /** A styled 'del' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Del: SC<HTP['del']>
  /** A styled 'details' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Details: SC<HTP['details']>
  /** A styled 'dfn' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dfn: SC<HTP['dfn']>
  /** A styled 'dialog' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dialog: SC<HTP['dialog']>
  /** A styled 'div' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Div: SC<HTP['div']>
  /** A styled 'dl' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dl: SC<HTP['dl']>
  /** A styled 'dt' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dt: SC<HTP['dt']>
  /** A styled 'em' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Em: SC<HTP['em']>
  /** A styled 'embed' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Embed: SC<HTP['embed']>
  /** A styled 'fieldset' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Fieldset: SC<HTP['fieldset']>
  /** A styled 'figcaption' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Figcaption: SC<HTP['figcaption']>
  /** A styled 'figure' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Figure: SC<HTP['figure']>
  /** A styled 'footer' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Footer: SC<HTP['footer']>
  /** A styled 'form' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Form: SC<HTP['form']>
  /** A styled 'h1' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H1: SC<HTP['h1']>
  /** A styled 'h2' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H2: SC<HTP['h2']>
  /** A styled 'h3' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H3: SC<HTP['h3']>
  /** A styled 'h4' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H4: SC<HTP['h4']>
  /** A styled 'h5' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H5: SC<HTP['h5']>
  /** A styled 'h6' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H6: SC<HTP['h6']>
  /** A styled 'header' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Header: SC<HTP['header']>
  /** A styled 'hgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Hgroup: SC<HTP['hgroup']>
  /** A styled 'hr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Hr: SC<HTP['hr']>
  /** A styled 'i' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var I: SC<HTP['i']>
  /** A styled 'iframe' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Iframe: SC<HTP['iframe']>
  /** A styled 'img' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Img: SC<HTP['img']>
  /** A styled 'input' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Input: SC<HTP['input']>
  /** A styled 'ins' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ins: SC<HTP['ins']>
  /** A styled 'kbd' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Kbd: SC<HTP['kbd']>
  /** A styled 'label' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Label: SC<HTP['label']>
  /** A styled 'legend' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Legend: SC<HTP['legend']>
  /** A styled 'li' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Li: SC<HTP['li']>
  /** A styled 'main' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Main: SC<HTP['main']>
  /** A styled 'map' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var MapC: SC<HTP['map']>
  /** A styled 'mark' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Mark: SC<HTP['mark']>
  /** A styled 'meter' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Meter: SC<HTP['meter']>
  /** A styled 'nav' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Nav: SC<HTP['nav']>
  /** A styled 'object' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var ObjectC: SC<HTP['object']>
  /** A styled 'ol' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ol: SC<HTP['ol']>
  /** A styled 'optgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Optgroup: SC<HTP['optgroup']>
  /** A styled 'option' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var OptionC: SC<HTP['option']>
  /** A styled 'output' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Output: SC<HTP['output']>
  /** A styled 'p' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var P: SC<HTP['p']>
  /** A styled 'picture' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Picture: SC<HTP['picture']>
  /** A styled 'pre' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Pre: SC<HTP['pre']>
  /** A styled 'progress' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Progress: SC<HTP['progress']>
  /** A styled 'q' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Q: SC<HTP['q']>
  /** A styled 'rp' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Rp: SC<HTP['rp']>
  /** A styled 'rt' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Rt: SC<HTP['rt']>
  /** A styled 'ruby' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ruby: SC<HTP['ruby']>
  /** A styled 's' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var S: SC<HTP['s']>
  /** A styled 'samp' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Samp: SC<HTP['samp']>
  /** A styled 'section' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Section: SC<HTP['section']>
  /** A styled 'select' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Select: SC<HTP['select']>
  /** A styled 'small' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Small: SC<HTP['small']>
  /** A styled 'span' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Span: SC<HTP['span']>
  /** A styled 'strong' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Strong: SC<HTP['strong']>
  /** A styled 'sub' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Sub: SC<HTP['sub']>
  /** A styled 'summary' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Summary: SC<HTP['summary']>
  /** A styled 'sup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Sup: SC<HTP['sup']>
  /** A styled 'table' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Table: SC<HTP['table']>
  /** A styled 'tbody' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tbody: SC<HTP['tbody']>
  /** A styled 'td' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Td: SC<HTP['td']>
  /** A styled 'textarea' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Textarea: SC<HTP['textarea']>
  /** A styled 'tfoot' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tfoot: SC<HTP['tfoot']>
  /** A styled 'th' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Th: SC<HTP['th']>
  /** A styled 'thead' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Thead: SC<HTP['thead']>
  /** A styled 'time' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Time: SC<HTP['time']>
  /** A styled 'tr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tr: SC<HTP['tr']>
  /** A styled 'u' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var U: SC<HTP['u']>
  /** A styled 'ul' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ul: SC<HTP['ul']>
  /** A styled 'video' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Video: SC<HTP['video']>
  /** A styled 'div' tag with d=flex and nice styled magic, like _style props, zx, css, and style short-hands  */
  var Flex: SC<HTP['div']>
  /** A styled 'div' tag with d=flex, flexDirection=column, and nice styled magic, like _style props, zx, css, and style short-hands  */
  var FlexC: SC<HTP['div']>
}

globalThis.A = styled.a``
globalThis.Abbr = styled.abbr``
globalThis.Address = styled.address``
globalThis.Area = styled.area``
globalThis.Article = styled.article``
globalThis.Aside = styled.aside``
globalThis.AudioC = styled.audio``
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
globalThis.Div = styled.div``
globalThis.Dl = styled.dl``
globalThis.Dt = styled.dt``
globalThis.Em = styled.em``
globalThis.Embed = styled.embed``
globalThis.Fieldset = styled.fieldset``
globalThis.Figcaption = styled.figcaption``
globalThis.Figure = styled.figure``
globalThis.Footer = styled.footer``
globalThis.Form = styled.form``
globalThis.H1 = styled.h1``
globalThis.H2 = styled.h2``
globalThis.H3 = styled.h3``
globalThis.H4 = styled.h4``
globalThis.H5 = styled.h5``
globalThis.H6 = styled.h6``
globalThis.Header = styled.header``
globalThis.Hgroup = styled.hgroup``
globalThis.Hr = styled.hr``
globalThis.I = styled.i``
globalThis.Iframe = styled.iframe``
globalThis.Img = styled.img``
globalThis.Input = styled.input``
globalThis.Ins = styled.ins``
globalThis.Kbd = styled.kbd``
globalThis.Label = styled.label``
globalThis.Legend = styled.legend``
globalThis.Li = styled.li``
globalThis.Main = styled.main``
globalThis.MapC = styled.map``
globalThis.Mark = styled.mark``
globalThis.Meter = styled.meter``
globalThis.Nav = styled.nav``
globalThis.ObjectC = styled.object``
globalThis.Ol = styled.ol``
globalThis.Optgroup = styled.optgroup``
globalThis.OptionC = styled.option``
globalThis.Output = styled.output``
globalThis.P = styled.p``
globalThis.Picture = styled.picture``
globalThis.Pre = styled.pre``
globalThis.Progress = styled.progress``
globalThis.Q = styled.q``
globalThis.Rp = styled.rp``
globalThis.Rt = styled.rt``
globalThis.Ruby = styled.ruby``
globalThis.S = styled.s``
globalThis.Samp = styled.samp``
globalThis.Section = styled.section``
globalThis.Select = styled.select``
globalThis.Small = styled.small``
globalThis.Span = styled.span``
globalThis.Strong = styled.strong``
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
globalThis.U = styled.u``
globalThis.Ul = styled.ul``
globalThis.Video = styled.video``

globalThis.Flex = styled.div`
  d: flex;
`
globalThis.FlexC = styled.div`
  d: flex;
  fd: column;
`
