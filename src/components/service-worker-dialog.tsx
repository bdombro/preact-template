/// <reference types="vite-plugin-pwa/client" />
import {useEffect, useRef} from 'react'
import {useRegisterSW} from 'virtual:pwa-register/react'

export function ServiceWorkerDialog() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered: r => {
      console.log('SW Registered: ' + r)
    },
    onRegisterError: error => {
      console.log('SW registration error', error)
    },
  })
  const needRefreshButtonRef = useRef<HTMLButtonElement>(null)
  const needRefreshDialogRef = useRef<HTMLDialogElement>(null)
  const offlineReadyButtonRef = useRef<HTMLButtonElement>(null)
  const offlineReadyDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (needRefresh) {
      needRefreshDialogRef.current?.showModal?.()
      needRefreshButtonRef.current?.focus()
    } else {
      needRefreshDialogRef.current?.close?.()
    }
  }, [needRefresh])
  useEffect(() => {
    if (offlineReady) {
      offlineReadyDialogRef.current?.showModal?.()
      offlineReadyButtonRef.current?.focus()
    } else {
      offlineReadyDialogRef.current?.close?.()
    }
  }, [offlineReady])

  const onNeedRefreshAction = () => {
    setNeedRefresh(false)
    updateServiceWorker(true)
  }

  const onOfflineReadyAction = () => {
    setOfflineReady(false)
  }

  return (
    <>
      <dialog onCancel={onNeedRefreshAction} onClose={onNeedRefreshAction} ref={needRefreshDialogRef}>
        <p>New content available, please save any drafts and click 'Reload'.</p>
        <Button id="sw-dismiss" type="button" onClick={onNeedRefreshAction} ref={needRefreshButtonRef}>
          Reload
        </Button>
      </dialog>

      <dialog
        open={offlineReady}
        onCancel={onOfflineReadyAction}
        onClose={onOfflineReadyAction}
        ref={offlineReadyDialogRef}
      >
        <h4 style={{margin: 0}}>You are offline.</h4>
        <p>
          This app is designed to work offline, so you can continue to use it. Note that data could be lost if someone
          else updates a record you have also updated while offline.
        </p>
        <Button id="sw-dismiss" type="button" onClick={onOfflineReadyAction} ref={offlineReadyButtonRef}>
          Dismiss
        </Button>
      </dialog>
    </>
  )
}
