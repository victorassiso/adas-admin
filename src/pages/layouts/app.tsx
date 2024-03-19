import { Outlet } from 'react-router-dom'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="m-auto flex min-h-screen max-w-screen-xl flex-col">
      <Header />
      <main className="flex-grow px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
