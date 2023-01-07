import * as boxes from './boxes.js'

export const Demo = () => (
  <boxes.Card>
    <boxes.Box minW={500}>I'm a box inside a Flex and Card</boxes.Box>
    <boxes.Box minW={500}>I'm a box inside a Flex and Card</boxes.Box>
  </boxes.Card>
)

export default {
  component: Demo,
}
