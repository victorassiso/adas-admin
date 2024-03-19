import './global.css'

import { ReactNode, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthContext } from './contexts/auth'
import { Animals } from './pages/animals/animals'
import { Home } from './pages/home'
import { AppLayout } from './pages/layouts/app'
import { Login } from './pages/login'
import { Users } from './pages/users/users'

export function App() {
  const { authState } = useContext(AuthContext)

  const user = authState.user

  function RedirectIfNotAuthenticated({ children }: { children: ReactNode }) {
    return user ? children : <Navigate to="/login" />
  }

  function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
    return user ? <Navigate to="/" /> : children
  }

  return (
    <BrowserRouter basename="/adas-admin">
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          element={
            <RedirectIfNotAuthenticated>
              <AppLayout />
            </RedirectIfNotAuthenticated>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/animals" element={<Animals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
