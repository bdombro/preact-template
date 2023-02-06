/// <reference types="vite-plugin-pwa/client" />
import {useRegisterSW} from 'virtual:pwa-register/react'

import {useUpdateEffect} from '~/util/hooks'

import {toast} from './toast'

export function ServiceWorkerToasts() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: r => {
      console.log('SW Registered: ' + r)
    },
    onRegisterError: error => {
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
              id="sw-dismiss"
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
