import {css} from '@linaria/core'

const heading = css`
  color: red;
`

export function Body() {
  return <h1 className={heading}>Hello, world.</h1>
}
