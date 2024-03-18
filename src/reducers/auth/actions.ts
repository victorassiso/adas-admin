import { User } from 'firebase/auth'

export enum ActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export type Actions =
  | {
      type: ActionTypes.LOGIN
      payload: {
        user: User
      }
    }
  | {
      type: ActionTypes.LOGOUT
    }
