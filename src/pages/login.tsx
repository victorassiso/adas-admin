import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { auth } from '@/../firebase'
import logo from '@/../public/logo.svg'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthContext } from '@/contexts/auth'

const loginFormSchema = z.object({
  email: z.string().min(1, { message: 'Campo obrigatório.' }),
  password: z.string().min(1, { message: 'Campo obrigatório.' }),
})

type LoginForm = z.infer<typeof loginFormSchema>

export function Login() {
  const { handleSubmit, register } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
  })
  const { login } = useContext(AuthContext)
  const [error, setError] = useState(false)

  const navigate = useNavigate()

  function handleLogin(data: LoginForm) {
    console.log('oi')
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user: User = userCredential.user
        login(user)
        navigate('/')
        // ...
      })
      .catch(() => {
        setError(true)
        // ...
      })
  }

  return (
    <div className="-mt-20 flex h-screen flex-col items-center justify-center gap-20 bg-background p-2">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo" width={80} />
        <span className="text-center font-title text-xl font-bold">
          ADAS | Associação dos Direitos dos Animais de Saquarema
        </span>
      </div>
      <Card className="">
        <form onSubmit={handleSubmit(handleLogin)} lang="pt">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Faça login na sua conta de administrador
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Label>E-mail</Label>
              </div>
              <Input type="email" {...register('email')} required />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Label>Senha</Label>
              </div>
              <Input type="password" {...register('password')} required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            {error && (
              <span className="text-sm text-destructive">
                ⚠ Credenciais inválidas
              </span>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
