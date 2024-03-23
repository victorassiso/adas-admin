import React, { createContext, useEffect, useReducer } from 'react'

import { createAnimal } from '@/api/createAnimal'
import { deleteAnimal } from '@/api/deleteAnimal'
import { getAnimals } from '@/api/getAnimals'
import { updateAnimal } from '@/api/updateAnimal'
import { Animal } from '@/models/animals'
import { ActionTypes } from '@/reducers/animals/actions'
import { animalsReducer, AnimalsState } from '@/reducers/animals/reducer'

interface AnimalsContextProps {
  animalsState: AnimalsState
  handleCreateAnimal: (data: Omit<Animal, 'id'>) => Promise<Animal>
  handleUpdateAnimal: (data: Animal) => Promise<Animal>
  handleDeleteAnimal: (id: string) => void
}

export const AnimalsContext = createContext({} as AnimalsContextProps)

const initialAnimalsState: AnimalsState = {
  animals: [{} as Animal],
}

export function AnimalsContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [animalsState, dispatch] = useReducer(
    animalsReducer,
    initialAnimalsState,
  )
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animals = await getAnimals()
        if (!animals) {
          throw new Error('Failed to fetch animals')
        }
        dispatch({
          type: ActionTypes.INIT,
          payload: animals,
        })
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  async function handleCreateAnimal(data: Omit<Animal, 'id'>) {
    const newAnimalRef = await createAnimal(data)
    if (!newAnimalRef) {
      throw new Error('Failed to create Animal')
    }
    const newAnimal = {
      id: newAnimalRef.id,
      ...data,
    }
    dispatch({
      type: ActionTypes.CREATE,
      payload: newAnimal,
    })
    return newAnimal
  }

  async function handleUpdateAnimal(data: Animal) {
    await updateAnimal(data)
    dispatch({
      type: ActionTypes.CREATE,
      payload: data,
    })
    return data
  }

  async function handleDeleteAnimal(id: string) {
    try {
      await deleteAnimal(id)

      dispatch({
        type: ActionTypes.DELETE,
        payload: { id },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AnimalsContext.Provider
      value={{
        animalsState,
        handleCreateAnimal,
        handleUpdateAnimal,
        handleDeleteAnimal,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  )
}
