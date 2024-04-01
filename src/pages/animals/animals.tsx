import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { AnimalsContextProvider } from '@/contexts/animals'

import { AnimalsHeader } from './components/common/header'
import { AnimalsTable } from './components/desktop/table'

const animalFormSchema = z.object({
  avatar: z.instanceof(FileList),
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  sex: z.enum(['Macho', 'Fêmea'], { required_error: 'Campo obrigatório' }),
  size: z.enum(['Grande', 'Médio', 'Pequeno'], {
    required_error: 'Campo obrigatório',
  }),
  weight: z.coerce.number().min(1, { message: 'Campo obrigatório' }),
  address: z.string().min(1, { message: 'Campo obrigatório' }),
  protectorName: z.string().min(1, { message: 'Campo obrigatório' }),
  contact: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type AnimalForm = z.infer<typeof animalFormSchema>

export function Animals() {
  const animalFormMethods = useForm<AnimalForm>({
    resolver: zodResolver(animalFormSchema),
  })

  return (
    <div className="flex flex-col gap-8">
      <AnimalsContextProvider>
        <FormProvider {...animalFormMethods}>
          <AnimalsHeader />
          <AnimalsTable />
        </FormProvider>
      </AnimalsContextProvider>
    </div>
  )
}
