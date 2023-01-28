import { LayoutDefault } from '~/components/layout-default'
import { Filler } from '~/components/filler'

export default function StackTest({ url }: { url: URL }) {
  return (
    <LayoutDefault>
      <h1>{url.pathname}</h1>
      <a href={`${url.pathname}/inner`}>Inner page</a>
      <Filler />
    </LayoutDefault>
  )
}
