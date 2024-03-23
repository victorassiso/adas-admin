import { useContext } from 'react'

import { AnimalsContext } from '@/contexts/animals'

export function useAnimals() {
  const animalsContext = useContext(AnimalsContext)
  return animalsContext
}
