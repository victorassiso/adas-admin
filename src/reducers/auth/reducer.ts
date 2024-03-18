import { User } from 'firebase/auth'

import { Actions, ActionTypes } from './actions'

export interface AuthState {
  user: User | null
}

export function authReducer(state: AuthState, action: Actions) {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
      }
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}
