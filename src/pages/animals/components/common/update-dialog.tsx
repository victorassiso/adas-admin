import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AnimalsContext } from '@/contexts/animals'

import { AnimalForm } from '../../animals'
import { FormInputs } from '../common/form-inputs'

export interface UpdateDialogProps {
  id: string
  avatar: string
  sex: 'Macho' | 'Fêmea'
  size: 'Grande' | 'Médio' | 'Pequeno'
  handleOpenDialog: (open: boolean) => void
}

export function UpdateDialog({
  id,
  avatar,
  sex,
  size,
  handleOpenDialog,
}: UpdateDialogProps) {
  const { handleUpdateAnimal } = useContext(AnimalsContext)
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<AnimalForm>()

  async function handleUpdateFormSubmit(data: AnimalForm) {
    const file = data.avatar?.[0]
    await handleUpdateAnimal({
      ...data,
      id,
      avatar: file || avatar,
    })
    handleOpenDialog(false)
  }

  return (
    <DialogContent
      className={`flex max-h-full px-0 md:max-h-[80%] ${
        isSubmitting ? 'cursor-wait' : ''
      }`}
    >
      <form
        onSubmit={handleSubmit(handleUpdateFormSubmit)}
        className="flex flex-col gap-6 overflow-y-scroll px-6 md:max-h-[calc(80%-1.5rem)]"
      >
        <DialogHeader>
          <DialogTitle>Editar animal</DialogTitle>
          <DialogDescription>
            Edite as informações desse animal
          </DialogDescription>
        </DialogHeader>
        <FormInputs prevImageUrl={avatar} sex={sex} size={size} />
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
          <Button disabled={isSubmitting} className="disabled:cursor-wait">
            Confirmar alterações
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
