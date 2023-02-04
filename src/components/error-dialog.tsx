import {useEffect, useRef, useState} from 'react'

export function ErrorDialog() {
  const [error, setError] = useState<Error | undefined>()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = (event: ErrorEvent) => setError(event.error)
    addEventListener('error', el)
    const ul = (event: PromiseRejectionEvent) => setError(event.reason)
    addEventListener('unhandledrejection', ul)
    return () => {
      removeEventListener('error', el)
      removeEventListener('unhandledrejection', ul)
    }
  }, [])

  useEffect(() => {
    if (error) {
      dialogRef.current?.showModal?.()
      buttonRef.current?.focus()
    } else {
      dialogRef.current?.close?.()
    }
  }, [error])

  const dismiss = () => setError(undefined)

  return (
    <dialog onCancel={dismiss} onClose={dismiss} ref={dialogRef} style={{maxWidth: 375}}>
      <h4 style={{marginBottom: 0}}>Sorry, something went wrong</h4>
      <p>You should probably refresh the page.</p>
      <fieldset style={{marginBottom: '2rem'}}>
        <legend>Cause</legend>
        {error?.message}
      </fieldset>
      <button id="error-dismiss" type="button" onClick={dismiss} ref={buttonRef}>
        Dismiss
      </button>
    </dialog>
  )
}
