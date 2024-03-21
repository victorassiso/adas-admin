import { zodResolver } from '@hookform/resolvers/zod'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { db, storage } from '@/../firebase'
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
        console.log('null')
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

  function uploadFile() {
    return new Promise<string>((resolve, reject) => {
      const file = fileList?.[0]

      if (file) {
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          (error) => {
            console.error(error)
            reject(error)
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          },
        )
      } else {
        reject(new Error('File not found!'))
      }
    })
  }

  async function handleCreateNewAnimal(data: NewAnimalForm) {
    try {
      const avatar = await uploadFile()

      await addDoc(collection(db, 'animals'), {
        avatar,
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
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      imagePreview ||
                      'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    }
                    alt="Foto de perfil"
                  />
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
                      {errors[item.id as keyof NewAnimalForm] && (
                        <span className="text-xs text-destructive">
                          {errors[item.id as keyof NewAnimalForm]?.message}
                        </span>
                      )}
                    </div>
                    <Input
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
