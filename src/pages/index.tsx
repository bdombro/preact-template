import { LayoutDefault } from '~/components/layout-default'

export default function Index() {
  return (
    <LayoutDefault>
      <H1>Home</H1>
      <button
        onClick={async () => {
          throw new Error('test')
        }}
        type="button"
      >
        Test Error Boundary
      </button>
    </LayoutDefault>
  )
}
