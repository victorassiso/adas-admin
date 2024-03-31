import { AnimalsTableRowProps } from '@/pages/animals/components/desktop/table-row'

import { Action, ActionTypes } from './actions'

export interface animalsState {
  animals: AnimalsTableRowProps[]
}
export function animalsReducer(state: animalsState, action: Action) {
  let newAnimals: AnimalsTableRowProps[]

  switch (action.type) {
    case ActionTypes.CREATE:
      return {
        ...state,
        animals: [action.payload.data, ...state.animals],
      }

    case ActionTypes.UPDATE:
      newAnimals = state.animals.map((item) => {
        if (item.id === action.payload.data.id) {
          return action.payload.data
        }
        return item
      })

      return {
        ...state,
        animals: newAnimals,
      }

    case ActionTypes.DELETE:
      newAnimals = state.animals.filter((item) => item.id !== action.payload.id)

      return {
        ...state,
        animals: newAnimals,
      }

    case ActionTypes.FETCH:
      return {
        ...state,
        animals: action.payload.data,
      }

    default:
      return state
  }
}
