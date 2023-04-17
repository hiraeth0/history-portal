import { useEffect } from 'react'

export const createHistoryPortal = (portalName: string) => {
  const entranceNumberKey = `entrance_number_${portalName}`
  const entranceHashKey = `entrance_hash_${portalName}`
  const exitNumberKey = `exit_number_${portalName}`
  const exitHashKey = `exit_hash_${portalName}`

  const getDistance = () => {
    const entranceNumber = Number(sessionStorage.getItem(entranceNumberKey))
    const exitNumber = Number(sessionStorage.getItem(exitNumberKey))

    if (Number.isNaN(entranceNumber) || Number.isNaN(exitNumber)) return

    return Math.abs(entranceNumber - exitNumber) + 1
  }

  const handlePopState = (event: PopStateEvent) => {
    const entranceHash = sessionStorage.getItem(entranceHashKey)
    const exitHash = sessionStorage.getItem(exitHashKey)
    const distance = getDistance()
    if (!entranceHash || !exitHash || !distance) return
    const currentHash = (event.state as { key: string }).key

    if (currentHash === entranceHash) {
      history.go(distance)
      return
    }
    if (currentHash === exitHash) {
      history.go(-distance)
      return
    }
  }

  let isSetEntrance = !!sessionStorage.getItem(entranceNumberKey)
  let isSetExit = !!sessionStorage.getItem(exitNumberKey)

  if (isSetEntrance && isSetExit) {
    window.addEventListener('popstate', handlePopState)
  }

  const useHistoryPortalEntrance = () => {
    useEffect(() => {
      if (!isSetEntrance) {
        sessionStorage.setItem(entranceNumberKey, String(history.length))
        sessionStorage.setItem(entranceHashKey, (history.state as { key: string }).key)
        isSetEntrance = true
      }
    }, [])
  }

  const useHistoryPortalExit = () => {
    useEffect(() => {
      if (!isSetExit) {
        sessionStorage.setItem(exitNumberKey, String(history.length))
        sessionStorage.setItem(exitHashKey, (history.state as { key: string }).key)
        isSetExit = true

        window.addEventListener('popstate', handlePopState)
      }
    }, [])
  }

  return { useHistoryPortalEntrance, useHistoryPortalExit }
}
