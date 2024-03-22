import { Instagram } from 'lucide-react'

export function Footer() {
  return (
    <div className="mt-20 flex flex-col gap-8 bg-zinc-800 px-10 pb-2 pt-5 text-muted-foreground">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-1.5">
          <img src={'logo.svg'} alt="Logo" width={30} height={30} />
          <span className="font-title text-2xl font-bold">ADAS</span>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground md:flex-row md:gap-8">
          <a
            className="flex cursor-pointer items-center gap-1"
            href={import.meta.env.VITE_INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={16} />
            <span>adas-saquarema</span>
          </a>
        </div>
      </div>

      <span className="text-center text-sm">
        © ADAS | Todos os direitos reservados.
      </span>
    </div>
  )
}
