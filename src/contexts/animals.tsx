import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import { createAnimal, CreateAnimalRequest } from '@/api/animals/create'
import { deleteAnimal } from '@/api/animals/delete'
import { queryAnimals } from '@/api/animals/query'
import { updateAnimal, UpdateAnimalRequest } from '@/api/animals/update'
import { ActionTypes } from '@/reducers/animals/actions'
import { animalsReducer, animalsState } from '@/reducers/animals/reducer'

interface AnimalsContextProps {
  animalsState: animalsState
  handleCreateAnimal: (data: CreateAnimalRequest) => Promise<void>
  handleDeleteAnimal: (id: string) => Promise<void>
  handleUpdateAnimal: (data: UpdateAnimalRequest) => Promise<void>
  isLoading: boolean
}

interface AnimalsContextProviderProps {
  children: ReactNode
}

export const AnimalsContext = createContext({} as AnimalsContextProps)

export const AnimalsContextProvider = ({
  children,
}: AnimalsContextProviderProps) => {
  const [animalsState, dispatch] = useReducer(animalsReducer, {
    animals: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchAnimals = async () => {
      setIsLoading(true)
      const animals = await queryAnimals()
      dispatch({
        type: ActionTypes.FETCH,
        payload: {
          data: animals,
        },
      })
      setIsLoading(false)
    }
    fetchAnimals()
  }, [])

  async function handleCreateAnimal(data: CreateAnimalRequest) {
    setIsLoading(true)
    const newAnimal = await createAnimal(data)
    setIsLoading(false)

    dispatch({
      type: ActionTypes.CREATE,
      payload: {
        data: newAnimal,
      },
    })
  }

  async function handleUpdateAnimal(data: UpdateAnimalRequest) {
    setIsLoading(true)
    const updatedAnimal = await updateAnimal(data)
    setIsLoading(false)

    dispatch({
      type: ActionTypes.UPDATE,
      payload: {
        data: updatedAnimal,
      },
    })
  }

  async function handleDeleteAnimal(id: string) {
    setIsLoading(true)
    await deleteAnimal(id)
    setIsLoading(false)

    dispatch({
      type: ActionTypes.DELETE,
      payload: {
        id,
      },
    })
  }

  return (
    <AnimalsContext.Provider
      value={{
        animalsState,
        handleCreateAnimal,
        handleDeleteAnimal,
        handleUpdateAnimal,
        isLoading,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}
