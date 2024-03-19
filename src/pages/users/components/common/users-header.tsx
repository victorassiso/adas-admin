import { zodResolver } from '@hookform/resolvers/zod'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewUserForm>({
    resolver: zodResolver(newUserFormSchema),
  })

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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Usuários</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Novo Usuário</Button>
          </DialogTrigger>
          <DialogContent>
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Label>Nome</Label>
                    <span className="text-xs text-destructive">
                      {errors.name && errors.name.message}
                    </span>
                  </div>
                  <Input type="name" {...register('name')} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Label>E-mail</Label>
                    <span className="text-xs text-destructive">
                      {errors.email && errors.email.message}
                    </span>
                  </div>
                  <Input type="email" {...register('email')} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Label>Senha</Label>
                    <span className="text-xs text-destructive">
                      {errors.password && errors.password.message}
                    </span>
                  </div>
                  <Input type="password" {...register('password')} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button>Criar usuário</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
