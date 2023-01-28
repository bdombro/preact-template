import { LayoutDefault } from '~/components/layout-default'

export default function Index() {
  return (
    <LayoutDefault>
      <H1>Home</H1>
      <Button
        id="test-error-boundary"
        onClick={async () => {
          throw new Error('test')
        }}
        type="button"
      >
        Test Error Boundary
      </Button>
    </LayoutDefault>
  )
}
