import { User } from 'firebase/auth'
import { createContext, ReactNode, useEffect, useReducer } from 'react'

import { ActionTypes } from '@/reducers/auth/actions'
import { authReducer, AuthState } from '@/reducers/auth/reducer'

interface AuthContextProps {
  authState: AuthState
  login: (user: User) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const user = localStorage.getItem('user')
  const [authState, dispatch] = useReducer(authReducer, {
    user: user ? JSON.parse(user) : null,
  })

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(authState.user))
  }, [authState.user])

  function login(user: User) {
    dispatch({
      type: ActionTypes.LOGIN,
      payload: {
        user,
      },
    })
  }

  function logout() {
    dispatch({
      type: ActionTypes.LOGOUT,
    })
  }
  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
