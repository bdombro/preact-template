import { useEffect, useState } from 'react'

export function ErrorDialog() {
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    const el = (event: ErrorEvent) => setError(event.error)
    addEventListener('error', el)
    const ul = (event: PromiseRejectionEvent) => setError(event.reason)
    addEventListener('unhandledrejection', ul)
    return () => {
      removeEventListener('error', el)
      removeEventListener('unhandledrejection', ul)
    }
  })

  if (!error) return null
  return (
    <dialog open>
      <h3>Sorry, something went wrong.</h3>
      <p>Cause: {error.message}</p>
      <button type="button" onClick={() => setError(undefined)}>
        Dismiss
      </button>
    </dialog>
  )
}
