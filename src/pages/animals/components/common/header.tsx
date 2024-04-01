import { useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AnimalsContext } from '@/contexts/animals'

import { AnimalForm } from '../../animals'
import { FormInputs } from './form-inputs'

export function AnimalsHeader() {
  const { handleCreateAnimal } = useContext(AnimalsContext)
  const [openDialog, setOpenDialog] = useState(false)
  const {
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { isSubmitting },
  } = useFormContext<AnimalForm>()

  const fileList = watch('avatar')

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  async function handleCreateNewAnimal(data: AnimalForm) {
    try {
      const file = fileList?.[0]
      if (!file) {
        setError('avatar', { message: 'Campo obrigatório', type: 'required' })
        throw new Error('No file detected')
      }
      await handleCreateAnimal({
        avatar: file,
        name: data.name,
        sex: data.sex,
        size: data.size || 'Médio',
        weight: data.weight || 0,
        address: data.address || '',
        contact: data.contact || '',
        protectorName: data.protectorName || '',
      })
      handleOpenDialog(false)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Animais</h2>
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo Animal</Button>
          </DialogTrigger>
          <DialogContent
            className={`flex max-h-full px-0 md:max-h-[80%] ${
              isSubmitting ? 'cursor-wait' : ''
            }`}
          >
            <form
              onSubmit={handleSubmit(handleCreateNewAnimal)}
              className="flex flex-col gap-6 overflow-y-scroll px-6 md:max-h-[calc(80%-1.5rem)]"
            >
              <DialogHeader>
                <DialogTitle>Novo animal</DialogTitle>
                <DialogDescription>
                  Cadastre um novo animal para adoção
                </DialogDescription>
              </DialogHeader>
              <FormInputs />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    disabled={isSubmitting}
                    className="disabled:cursor-wait"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                >
                  Cadastrar animal
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
