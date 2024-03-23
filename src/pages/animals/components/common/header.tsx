import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { uploadFile } from '@/api/uploadFile'
import noImageIcon from '@/assets/no-image-icon.jpg'
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
import { useAnimals } from '@/hooks/use-animals'
import { fileToDataString } from '@/utils'

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
  avatar: z.instanceof(FileList).refine((fileList) => fileList.length > 0, {
    message: 'Campo obrigatório',
  }),
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  sex: z.enum(['Macho', 'Fêmea'], { required_error: 'Campo obrigatório' }),
  size: z
    .enum(['Grande', 'Médio', 'Pequeno'], {
      required_error: 'Campo obrigatório',
    })
    .optional(),
  weight: z.coerce.number().optional(),
  address: z.string().optional(),
  protectorName: z.string().optional(),
  contact: z.string().optional(),
})

type NewAnimalForm = z.infer<typeof newAnimalFormSchema>

export function AnimalsHeader() {
  const { handleCreateAnimal } = useAnimals()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const {
    handleSubmit,
    register,
    reset,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NewAnimalForm>({
    resolver: zodResolver(newAnimalFormSchema),
  })

  const fileList = watch('avatar')

  useEffect(() => {
    const file = fileList?.[0]

    const UpdateImagePreview = async () => {
      if (file) {
        console.log('not null')
        try {
          setImagePreview(await fileToDataString(file))
        } catch (error) {
          console.error(error)
          setImagePreview(null)
        }
      } else {
        setImagePreview(null)
      }
    }

    UpdateImagePreview()
  }, [fileList])

  function handleOpenDialog(open: boolean) {
    if (!open) {
      reset()
    }
    setOpenDialog(open)
  }

  // function uploadFile() {
  //   return new Promise<string>((resolve, reject) => {
  //     const file = fileList?.[0]

  //     if (file) {
  //       const fileName = new Date().getTime() + file.name
  //       const storageRef = ref(storage, fileName)
  //       const uploadTask = uploadBytesResumable(storageRef, file)

  //       uploadTask.on(
  //         'state_changed',
  //         (snapshot) => {
  //           // Observe state change events such as progress, pause, and resume
  //           // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //           console.log('Upload is ' + progress + '% done')
  //           switch (snapshot.state) {
  //             case 'paused':
  //               console.log('Upload is paused')
  //               break
  //             case 'running':
  //               console.log('Upload is running')
  //               break
  //             default:
  //               break
  //           }
  //         },
  //         (error) => {
  //           console.error(error)
  //           reject(error)
  //           // Handle unsuccessful uploads
  //         },
  //         () => {
  //           // Handle successful uploads on complete
  //           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             resolve(downloadURL)
  //           })
  //         },
  //       )
  //     } else {
  //       reject(new Error('File not found!'))
  //     }
  //   })
  // }

  async function handleFormSubmit(data: NewAnimalForm) {
    try {
      const file = fileList?.[0]
      if (!file) {
        toast.error('Erro ao subir imagem no servidor')
        return
      }
      const avatar = await uploadFile(file)
      await handleCreateAnimal({
        ...data,
        avatar,
      })
      handleOpenDialog(false)
    } catch (e) {
      console.log(e)
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
            className={
              isSubmitting
                ? 'flex max-h-full cursor-wait px-0 md:max-h-[80%]'
                : 'flex max-h-full px-0 md:max-h-[80%]'
            }
          >
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col gap-6 overflow-y-scroll px-6 md:max-h-[calc(80%-1.5rem)]"
            >
              <DialogHeader>
                <DialogTitle>Novo animal</DialogTitle>
                <DialogDescription>
                  Cadastre um novo animal para adoção
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <img src={imagePreview || noImageIcon} alt="Foto de perfil" />
                </div>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="picture"
                    id="picture"
                    className={isSubmitting ? 'cursor-wait' : ''}
                  >
                    Foto do animal
                  </Label>
                  {errors.avatar && (
                    <span className="text-xs text-destructive">
                      {errors.avatar.message}
                    </span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                  {...register('avatar')}
                />
              </div>
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
                              {errors[item.id as keyof NewAnimalForm]?.message}
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
                              className={isSubmitting ? 'cursor-wait' : ''}
                              htmlFor={item.id}
                            >
                              {item.label}
                            </Label>
                            <span className="text-xs text-destructive">
                              {errors[item.id as keyof NewAnimalForm]?.message}
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
                        htmlFor={item.id}
                        className={isSubmitting ? 'cursor-wait' : ''}
                      >
                        {item.label}
                      </Label>
                      {errors[item.id as keyof NewAnimalForm] && (
                        <span className="text-xs text-destructive">
                          {errors[item.id as keyof NewAnimalForm]?.message}
                        </span>
                      )}
                    </div>
                    <Input
                      id={item.id}
                      type={item.type}
                      {...register(item.id as keyof NewAnimalForm)}
                      disabled={isSubmitting}
                      className="disabled:cursor-wait"
                    />
                  </div>
                )
              })}
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
