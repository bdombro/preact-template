import { Card } from './card'

export const Demo = () => (
  <Card>
    <Box minW={500}>I'm a box inside a Flex and Card</Box>
    <Box minW={500}>I'm a box inside a Flex and Card</Box>
  </Card>
)

export default {
  component: Demo,
}
