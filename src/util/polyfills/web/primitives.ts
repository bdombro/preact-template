import * as prims from '@slimr/styled'
import {Fragment as _Fragment, Suspense as _Suspense} from 'react'

// You must export something or TS gets confused.
export {}

declare global {
  // React primitives

  var F: typeof _Fragment
  var Fragment: typeof _Fragment
  var Suspense: typeof _Suspense

  /** A styled 'a' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var A: typeof prims.A
  /** A styled 'abbr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Abbr: typeof prims.Abbr
  /** A styled 'address' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Address: typeof prims.Address
  /** A styled 'area' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Area: typeof prims.Area
  /** A styled 'article' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Article: typeof prims.Article
  /** A styled 'aside' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Aside: typeof prims.Aside
  /** A styled 'audio' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var AudioC: typeof prims.AudioC
  /** A styled 'b' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var B: typeof prims.B
  /** A styled 'blockquote' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Blockquote: typeof prims.Blockquote
  /** A styled 'br' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Br: typeof prims.Br
  /** A styled 'button' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Button: typeof prims.Button
  /** A styled 'caption' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Caption: typeof prims.Caption
  /** A styled 'cite' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Cite: typeof prims.Cite
  /** A styled 'code' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Code: typeof prims.Code
  /** A styled 'col' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Col: typeof prims.Col
  /** A styled 'colgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Colgroup: typeof prims.Colgroup
  /** A styled 'dd' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dd: typeof prims.Dd
  /** A styled 'del' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Del: typeof prims.Del
  /** A styled 'details' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Details: typeof prims.Details
  /** A styled 'dfn' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dfn: typeof prims.Dfn
  /** A styled 'dialog' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dialog: typeof prims.Dialog
  /** A styled 'div' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Div: typeof prims.Div
  /** A styled 'dl' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dl: typeof prims.Dl
  /** A styled 'dt' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Dt: typeof prims.Dt
  /** A styled 'em' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Em: typeof prims.Em
  /** A styled 'embed' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Embed: typeof prims.Embed
  /** A styled 'fieldset' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Fieldset: typeof prims.Fieldset
  /** A styled 'figcaption' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Figcaption: typeof prims.Figcaption
  /** A styled 'figure' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Figure: typeof prims.Figure
  /** A styled 'footer' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Footer: typeof prims.Footer
  /** A styled 'form' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Form: typeof prims.Form
  /** A styled 'h1' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H1: typeof prims.H1
  /** A styled 'h2' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H2: typeof prims.H2
  /** A styled 'h3' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H3: typeof prims.H3
  /** A styled 'h4' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H4: typeof prims.H4
  /** A styled 'h5' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H5: typeof prims.H5
  /** A styled 'h6' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var H6: typeof prims.H6
  /** A styled 'header' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Header: typeof prims.Header
  /** A styled 'hgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Hgroup: typeof prims.Hgroup
  /** A styled 'hr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Hr: typeof prims.Hr
  /** A styled 'i' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var I: typeof prims.I
  /** A styled 'iframe' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Iframe: typeof prims.Iframe
  /** A styled 'img' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Img: typeof prims.Img
  /** A styled 'input' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Input: typeof prims.Input
  /** A styled 'ins' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ins: typeof prims.Ins
  /** A styled 'kbd' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Kbd: typeof prims.Kbd
  /** A styled 'label' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Label: typeof prims.Label
  /** A styled 'legend' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Legend: typeof prims.Legend
  /** A styled 'li' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Li: typeof prims.Li
  /** A styled 'main' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Main: typeof prims.Main
  /** A styled 'map' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var MapC: typeof prims.MapC
  /** A styled 'mark' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Mark: typeof prims.Mark
  /** A styled 'meter' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Meter: typeof prims.Meter
  /** A styled 'nav' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Nav: typeof prims.Nav
  /** A styled 'object' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var ObjectC: typeof prims.ObjectC
  /** A styled 'ol' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ol: typeof prims.Ol
  /** A styled 'optgroup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Optgroup: typeof prims.Optgroup
  /** A styled 'option' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var OptionC: typeof prims.OptionC
  /** A styled 'output' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Output: typeof prims.Output
  /** A styled 'p' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var P: typeof prims.P
  /** A styled 'picture' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Picture: typeof prims.Picture
  /** A styled 'pre' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Pre: typeof prims.Pre
  /** A styled 'progress' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Progress: typeof prims.Progress
  /** A styled 'q' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Q: typeof prims.Q
  /** A styled 'rp' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Rp: typeof prims.Rp
  /** A styled 'rt' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Rt: typeof prims.Rt
  /** A styled 'ruby' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ruby: typeof prims.Ruby
  /** A styled 's' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var S: typeof prims.S
  /** A styled 'samp' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Samp: typeof prims.Samp
  /** A styled 'section' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Section: typeof prims.Section
  /** A styled 'select' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Select: typeof prims.Select
  /** A styled 'small' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Small: typeof prims.Small
  /** A styled 'span' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Span: typeof prims.Span
  /** A styled 'strong' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Strong: typeof prims.Strong
  /** A styled 'sub' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Sub: typeof prims.Sub
  /** A styled 'summary' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Summary: typeof prims.Summary
  /** A styled 'sup' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Sup: typeof prims.Sup
  /** A styled 'table' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Table: typeof prims.Table
  /** A styled 'tbody' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tbody: typeof prims.Tbody
  /** A styled 'td' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Td: typeof prims.Td
  /** A styled 'textarea' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Textarea: typeof prims.Textarea
  /** A styled 'tfoot' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tfoot: typeof prims.Tfoot
  /** A styled 'th' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Th: typeof prims.Th
  /** A styled 'thead' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Thead: typeof prims.Thead
  /** A styled 'time' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Time: typeof prims.Time
  /** A styled 'tr' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Tr: typeof prims.Tr
  /** A styled 'u' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var U: typeof prims.U
  /** A styled 'ul' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Ul: typeof prims.Ul
  /** A styled 'video' tag with nice styled magic, like _style props, zx, css, and style short-hands  */
  var Video: typeof prims.Video
  /** A styled 'div' tag with d=flex and nice styled magic, like _style props, zx, css, and style short-hands  */
  var Flex: typeof prims.Flex
  /** A styled 'div' tag with d=flex, flexDirection=column, and nice styled magic, like _style props, zx, css, and style short-hands  */
  var FlexC: typeof prims.FlexC
}

// React primitives
globalThis.F = _Fragment
globalThis.Fragment = _Fragment
globalThis.Suspense = _Suspense

globalThis.A = prims.A
globalThis.Abbr = prims.Abbr
globalThis.Address = prims.Address
globalThis.Area = prims.Area
globalThis.Article = prims.Article
globalThis.Aside = prims.Aside
globalThis.AudioC = prims.AudioC
globalThis.B = prims.B
globalThis.Blockquote = prims.Blockquote
globalThis.Br = prims.Br
globalThis.Button = prims.Button
globalThis.Caption = prims.Caption
globalThis.Cite = prims.Cite
globalThis.Code = prims.Code
globalThis.Col = prims.Col
globalThis.Colgroup = prims.Colgroup
globalThis.Dd = prims.Dd
globalThis.Del = prims.Del
globalThis.Details = prims.Details
globalThis.Dfn = prims.Dfn
globalThis.Dialog = prims.Dialog
globalThis.Div = prims.Div
globalThis.Dl = prims.Dl
globalThis.Dt = prims.Dt
globalThis.Em = prims.Em
globalThis.Embed = prims.Embed
globalThis.Fieldset = prims.Fieldset
globalThis.Figcaption = prims.Figcaption
globalThis.Figure = prims.Figure
globalThis.Footer = prims.Footer
globalThis.Form = prims.Form
globalThis.H1 = prims.H1
globalThis.H2 = prims.H2
globalThis.H3 = prims.H3
globalThis.H4 = prims.H4
globalThis.H5 = prims.H5
globalThis.H6 = prims.H6
globalThis.Header = prims.Header
globalThis.Hgroup = prims.Hgroup
globalThis.Hr = prims.Hr
globalThis.I = prims.I
globalThis.Iframe = prims.Iframe
globalThis.Img = prims.Img
globalThis.Input = prims.Input
globalThis.Ins = prims.Ins
globalThis.Kbd = prims.Kbd
globalThis.Label = prims.Label
globalThis.Legend = prims.Legend
globalThis.Li = prims.Li
globalThis.Main = prims.Main
globalThis.MapC = prims.MapC
globalThis.Mark = prims.Mark
globalThis.Meter = prims.Meter
globalThis.Nav = prims.Nav
globalThis.ObjectC = prims.ObjectC
globalThis.Ol = prims.Ol
globalThis.Optgroup = prims.Optgroup
globalThis.OptionC = prims.OptionC
globalThis.Output = prims.Output
globalThis.P = prims.P
globalThis.Picture = prims.Picture
globalThis.Pre = prims.Pre
globalThis.Progress = prims.Progress
globalThis.Q = prims.Q
globalThis.Rp = prims.Rp
globalThis.Rt = prims.Rt
globalThis.Ruby = prims.Ruby
globalThis.S = prims.S
globalThis.Samp = prims.Samp
globalThis.Section = prims.Section
globalThis.Select = prims.Select
globalThis.Small = prims.Small
globalThis.Span = prims.Span
globalThis.Strong = prims.Strong
globalThis.Sub = prims.Sub
globalThis.Summary = prims.Summary
globalThis.Sup = prims.Sup
globalThis.Table = prims.Table
globalThis.Tbody = prims.Tbody
globalThis.Td = prims.Td
globalThis.Textarea = prims.Textarea
globalThis.Tfoot = prims.Tfoot
globalThis.Th = prims.Th
globalThis.Thead = prims.Thead
globalThis.Time = prims.Time
globalThis.Tr = prims.Tr
globalThis.U = prims.U
globalThis.Ul = prims.Ul
globalThis.Video = prims.Video

globalThis.Flex = prims.Flex
globalThis.FlexC = prims.FlexC
