// /// <reference types="vite-plugin-pwa/client" /> -- doesnt work with moduleResolution: bundler
import {useUpdateEffect} from '@slimr/hooks'
// @ts-expect-error -- no types
import {useRegisterSW} from 'virtual:pwa-register/react'

import {toast} from './toast'

/**
 * A falsey component that is all-effect -- it listens for service worker events
 * and triggers a toast to notify the user.
 *
 * Is a component and not hook for conveniently calling as a sibling component
 * to the toast component. As a hook, would have to be called in a child.
 */
export function ServiceWorkerToasts() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: (r: string) => {
      console.log('SW Registered: ' + r)
    },
    onRegisterError: (error: Error) => {
      console.log('SW registration error', error)
    },
  })

  useUpdateEffect(() => {
    if (needRefresh) {
      toast({
        message: (
          <>
            <p>New app version available, please save any drafts and click 'Reload'.</p>
            <button
              onClick={() => {
                updateServiceWorker()
                setNeedRefresh(false)
                localStorage.clear()
                location.reload()
              }}
              type="button"
            >
              Reload
            </button>
          </>
        ),
        key: 'need-refresh',
        duration: Infinity,
        placement: 'bottom',
      })
    } else {
      toast.cancel('need-refresh')
      toast({message: 'App version updated', variant: 'success'})
    }
  }, [needRefresh])

  return null
}
