import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { db } from '@/../firebase'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface inputProps {
  id: string
  label: string
  type: string
}

const newAnimalInputs: inputProps[] = [
  {
    id: 'name',
    label: 'Nome',
    type: 'text',
  },
  {
    id: 'sex',
    label: 'Sexo',
    type: 'radio',
  },
  {
    id: 'size',
    label: 'Porte',
    type: 'radio',
  },
  {
    id: 'weight',
    label: 'Peso',
    type: 'text',
  },
  {
    id: 'address',
    label: 'Endereço',
    type: 'text',
  },
  {
    id: 'protectorName',
    label: 'Protetor',
    type: 'text',
  },
  {
    id: 'contact',
    label: 'Telefone para contato',
    type: 'text',
  },
]

const newAnimalFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  sex: z.enum(['Macho', 'Fêmea'], { required_error: 'Campo obrigatório' }),
  size: z.enum(['Grande', 'Médio', 'Pequeno'], {
    required_error: 'Campo obrigatório',
  }),
  weight: z.coerce.number().min(1, { message: 'Campo obrigatório' }),
  address: z.string().min(1, { message: 'Campo obrigatório' }),
  protectorName: z.string().min(1, { message: 'Campo obrigatório' }),
  contact: z.string().min(1, 'Campo obrigatório'),
})

type NewAnimalForm = z.infer<typeof newAnimalFormSchema>

export function AnimalsHeader() {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewAnimalForm>({
    resolver: zodResolver(newAnimalFormSchema),
  })

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  async function handleCreateNewAnimal(data: NewAnimalForm) {
    try {
      await addDoc(collection(db, 'animals'), {
        name: data.name,
        sex: data.sex,
        size: data.size,
        weight: data.weight,
        address: data.address,
        protectorName: data.protectorName,
        contact: data.contact,
        timeStamp: serverTimestamp(),
      }).catch((err) => {
        console.log(err)
      })

      handleOpenDialog(false)
    } catch (err) {
      console.log(err)
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
          <DialogContent className={isSubmitting ? 'cursor-wait' : ''}>
            <form
              onSubmit={handleSubmit(handleCreateNewAnimal)}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle>Novo usuário</DialogTitle>
                <DialogDescription>
                  Crie uma nova conta de administrador
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {newAnimalInputs.map((item) => {
                  if (item.id === 'sex') {
                    return (
                      <Controller
                        key={item.id}
                        control={control}
                        name={item.id}
                        render={({ field: { onChange } }) => (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Label
                                id={item.id}
                                className={isSubmitting ? 'cursor-wait' : ''}
                              >
                                {item.label}
                              </Label>
                              <span className="text-xs text-destructive">
                                {
                                  errors[item.id as keyof NewAnimalForm]
                                    ?.message
                                }
                              </span>
                            </div>
                            <RadioGroup
                              onValueChange={onChange}
                              className="flex gap-4"
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="Macho" id="Macho" />
                                <Label htmlFor="Macho">Macho</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="Fêmea" id="Fêmea" />
                                <Label htmlFor="Fêmea">Fêmea</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                      />
                    )
                  }
                  if (item.id === 'size') {
                    return (
                      <Controller
                        key={item.id}
                        control={control}
                        name={item.id}
                        render={({ field: { onChange } }) => (
                          <div key={item.id} className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Label
                                id={item.id}
                                className={isSubmitting ? 'cursor-wait' : ''}
                              >
                                {item.label}
                              </Label>
                              <span className="text-xs text-destructive">
                                {
                                  errors[item.id as keyof NewAnimalForm]
                                    ?.message
                                }
                              </span>
                            </div>
                            <RadioGroup
                              onValueChange={onChange}
                              className="flex gap-4"
                            >
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="Grande" id="Grande" />
                                <Label htmlFor="Grande">Grande</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="Médio" id="Médio" />
                                <Label htmlFor="Médio">Médio</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="Pequeno" id="Pequeno" />
                                <Label htmlFor="Pequeno">Pequeno</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        )}
                      />
                    )
                  }
                  return (
                    <div key={item.id} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label
                          id={item.id}
                          className={isSubmitting ? 'cursor-wait' : ''}
                        >
                          {item.label}
                        </Label>
                        <span className="text-xs text-destructive">
                          {errors[item.id as keyof NewAnimalForm]?.message}
                        </span>
                      </div>
                      <Input
                        type={item.id}
                        {...register(item.id as keyof NewAnimalForm)}
                        disabled={isSubmitting}
                        className="disabled:cursor-wait"
                      />
                    </div>
                  )
                })}
              </div>
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
                  Criar usuário
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
