'use client'
import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/use-media-query'

import { NavMenuLink } from './nav-menu-link'

export function NavMenu() {
  const isBreakpoint = useMediaQuery(768 - 1)

  return (
    <>
      {isBreakpoint ? (
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col items-center justify-start gap-2">
              <NavMenuLink to="/">Início</NavMenuLink>
              <NavMenuLink to="/catalogo">Animais para adoção</NavMenuLink>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="flex items-center gap-2">
          <NavMenuLink to="/">Início</NavMenuLink>
          <NavMenuLink to="/catalogo">Animais para adoção</NavMenuLink>
        </div>
      )}
    </>
  )
}
