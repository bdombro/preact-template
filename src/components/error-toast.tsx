import {useEffect} from 'react'

import {toast} from './toast'

export function ErrorToast() {
  useEffect(() => {
    const onError = (error: Error) => {
      console.error(error)
      toast({
        dismissable: false,
        key: 'error',
        duration: Infinity,
        icon: null,
        message: (
          <>
            <p>Something went wrong and you need to reset the page.</p>
            <button
              id="error-dismiss"
              type="button"
              onClick={() => {
                toast.cancel('error')
                localStorage.clear()
                location.reload()
              }}
            >
              Reset Page
            </button>
          </>
        ),
        // placement: 'center',
      })
    }
    const el = (event: ErrorEvent) => onError(event.error)
    addEventListener('error', el)
    const ul = (event: PromiseRejectionEvent) => onError(event.reason)
    addEventListener('unhandledrejection', ul)
    return () => {
      removeEventListener('error', el)
      removeEventListener('unhandledrejection', ul)
    }
  }, [])

  return null
}
