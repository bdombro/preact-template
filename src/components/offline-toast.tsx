import {toast} from './toast'

export function OfflineToast() {
  useEffect(() => {
    addEventListener('offline', onOffline)
    addEventListener('online', onOnline)
    return () => {
      removeEventListener('offline', onOffline)
      removeEventListener('online', onOnline)
    }
  })
  return null
}

function onOffline() {
  toast({message: 'Disconnected', variant: 'alert'})
  toast({
    message: 'You are offline. This app works some but not all offline',
    key: 'offline-ready',
    duration: Infinity,
    placement: 'bottom',
  })
}

function onOnline() {
  toast.cancel('offline-ready')
  toast({message: 'Reconnected', variant: 'success'})
}
