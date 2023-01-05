import {styled} from '@linaria/react'
import {useEffect, useState} from 'react'

const H1 = styled.h1<{variant: string}>`
  color: ${(p) => p.variant};
`

export function Body() {
  const on = useOscillator()
  return <H1 variant={on ? 'red' : 'blue'}>Hello, world.</H1>
}

/** A hook that just return a boolean that oscilates on/off */
function useOscillator() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setOn((on) => !on)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return on
}
