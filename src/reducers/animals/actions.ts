import { Animal } from '@/models/animals'

export enum ActionTypes {
  INIT = 'INIT',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type Actions =
  | {
    type: ActionTypes.INIT
    payload: Animal[]
  }
  | {
    type: ActionTypes.CREATE
    payload: Animal
  }
  | {
    type: ActionTypes.UPDATE
    payload: Animal
  }
  | {
    type: ActionTypes.DELETE
    payload: Pick<Animal, 'id'>
  }
