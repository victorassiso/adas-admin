import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { auth, db } from '@/../firebase'
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

interface newUserInputProps {
  id: string
  label: string
  type: string
}

const newUserInputs: newUserInputProps[] = [
  {
    id: 'name',
    label: 'Nome',
    type: 'text',
  },
  {
    id: 'email',
    label: 'E-mail',
    type: 'email',
  },
  {
    id: 'password',
    label: 'Senha',
    type: 'password',
  },
]

const newUserFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  email: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .email({ message: 'Formato inválido' }),
  password: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

type NewUserForm = z.infer<typeof newUserFormSchema>

export function UsersHeader() {
  const [openDialog, setOpenDialog] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewUserForm>({
    resolver: zodResolver(newUserFormSchema),
  })

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  async function handleCreateNewUser(data: NewUserForm) {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (userCredential) => {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            name: data.name,
            email: data.email,
            timeStamp: serverTimestamp(),
          })
        })
        .catch((err) => {
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
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
        <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
          <DialogTrigger asChild>
            <Button>Novo Usuário</Button>
          </DialogTrigger>
          <DialogContent className={isSubmitting ? 'cursor-wait' : ''}>
            <form
              onSubmit={handleSubmit(handleCreateNewUser)}
              className="flex flex-col gap-6"
            >
              <DialogHeader>
                <DialogTitle>Novo usuário</DialogTitle>
                <DialogDescription>
                  Crie uma nova conta de administrador
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {newUserInputs.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Label className={isSubmitting ? 'cursor-wait' : ''}>
                          {item.label}
                        </Label>
                        <span className="text-xs text-destructive">
                          {errors[item.id as keyof NewUserForm]?.message}
                        </span>
                      </div>
                      <Input
                        type={item.id}
                        {...register(item.id as keyof NewUserForm)}
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
