import styled from '@ustyle/styled'
import { FC } from 'react'

// We could use styled.div if we imported @ustyle/styled/withHtmlTags,
// but we only really need/want the div tag. So defining div here as
// a conveneince.
const div = 'div' as unknown as FC<JSX.IntrinsicElements['div']>

export const Box = styled(div)`
  pos: relative;
`
export const Flex = styled(div)`
  pos: relative;
  d: flex;
`
export const FlexC = styled(div)`
  pos: relative;
  d: flex;
  fd: column;
`
export const Card = styled(div)`
  pos: relative;
  br: 4px;
  b: 1px solid #e5e5e5;
  px: [20px, null, 40px];
`
