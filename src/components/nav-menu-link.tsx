import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Button } from './ui/button'
import { SheetClose } from './ui/sheet'

interface NavMenuLinkProps {
  to: string
  children: ReactNode
  className?: string
}
export function NavMenuLink({ to, children }: NavMenuLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === to

  return (
    <SheetClose asChild>
      <Button
        asChild
        variant="ghost"
        className="flex w-full flex-col gap-1 text-muted-foreground md:w-auto"
      >
        <Link to={to}>
          <div className="group text-muted-foreground transition duration-300">
            {children}
            <div
              data-current={isActive}
              className="h-0.5 max-w-0 rounded-sm bg-primary transition-all duration-500 data-[current=true]:max-w-[80%]"
            />
          </div>
        </Link>
      </Button>
    </SheetClose>
  )
}
