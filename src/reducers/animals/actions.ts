import { AnimalsTableRowProps } from '@/pages/animals/components/desktop/table-row'

export enum ActionTypes {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  FETCH = 'FETCH',
}

export type Action =
  | {
      type: ActionTypes.CREATE
      payload: {
        data: AnimalsTableRowProps
      }
    }
  | {
      type: ActionTypes.DELETE
      payload: {
        id: string
      }
    }
  | {
      type: ActionTypes.UPDATE
      payload: {
        data: AnimalsTableRowProps
      }
    }
  | {
      type: ActionTypes.FETCH
      payload: {
        data: AnimalsTableRowProps[]
      }
    }
