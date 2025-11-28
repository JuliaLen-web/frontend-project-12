import { useCallback, useEffect } from 'react'
import * as leoProfanity from 'leo-profanity'

export const useProfanityFilter = () => {
  useEffect(() => {
    leoProfanity.loadDictionary('ru')
  }, [])

  const filter = useCallback((text, replacement = '*') => leoProfanity.clean(text, replacement), [])

  const check = useCallback(text => leoProfanity.check(text), [])

  return {
    filter,
    check,
  }
}
