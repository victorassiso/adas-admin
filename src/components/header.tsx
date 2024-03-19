import { Link } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useMediaQuery } from '@/hooks/use-media-query'

import { NavMenu } from './nav-menu'

export function Header() {
  const isBreakpoint = useMediaQuery(768 - 1)

  const imageSize = isBreakpoint ? 40 : 72

  return (
    <header className="flex items-center gap-2 px-4 py-5">
      <Link to="/" className="flex items-center gap-2">
        <img src={'logo.svg'} alt="Logo" width={imageSize} height={imageSize} />
        <span className="border-box block font-title text-3xl font-bold md:text-5xl">
          ADAS
        </span>
      </Link>

      <div className="flex flex-grow justify-end">
        <NavMenu />
      </div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="Foto de perfil" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </header>
  )
}
