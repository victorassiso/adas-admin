import { Animal } from '@/models/animals'

import { Actions, ActionTypes } from './actions'

export interface AnimalsState {
  animals: Animal[]
}

export function animalsReducer(state: AnimalsState, action: Actions) {
  let updatedAnimals: Animal[]
  let animalIndex = -1

  switch (action.type) {
    case ActionTypes.INIT:
      return {
        ...state,
        animals: action.payload,
      }

    case ActionTypes.CREATE:
      return {
        ...state,
        animals: [action.payload, ...state.animals],
      }

    case ActionTypes.UPDATE:
      animalIndex = state.animals.findIndex(
        (animal) => animal.id === action.payload.id,
      )
      if (animalIndex >= 0) {
        return {
          ...state,
          animals: state.animals.map((animal) => {
            if (animal.id === action.payload.id) {
              return action.payload
            }
            return animal
          }),
        }
      }
      return state

    case ActionTypes.DELETE:
      updatedAnimals = state.animals.filter(
        (animal) => animal.id !== action.payload.id,
      )
      return {
        ...state,
        animals: updatedAnimals,
      }

    default:
      return state
  }
}
