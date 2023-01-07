/* eslint-disable react/button-has-type */
import styled from '@ustyle/styled'

interface ButtonProps
  extends Omit<JSX.IntrinsicElements['button'], 'id' | 'type'> {
  id: JSX.IntrinsicElements['button']['id'] // make required
  type: JSX.IntrinsicElements['button']['type'] // make required
}
function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => {
        console.log(`Button ${props.id} clicked`)
        props.onClick?.(e)
      }}
    />
  )
}

export const ButtonP = styled(Button)`
  bg: red;
  c: white;
  w: [100%, null, inherit];
`
