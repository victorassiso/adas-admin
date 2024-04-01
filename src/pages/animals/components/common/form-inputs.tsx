import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import noImageIcon from '@/assets/no-image-icon.jpg'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { fileToDataString } from '@/utils'

import { AnimalForm } from '../../animals'

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

interface FormInputs {
  prevImageUrl?: string
  sex?: AnimalForm['sex']
  size?: AnimalForm['size']
}
export function FormInputs({ prevImageUrl, sex, size }: FormInputs) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    prevImageUrl || null,
  )
  const {
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useFormContext<AnimalForm>()

  const fileList = watch('avatar')
  useEffect(() => {
    const file = fileList?.[0]

    const UpdateImagePreview = async () => {
      if (file) {
        try {
          const avatarPreview = await fileToDataString(file)
          setImagePreview(avatarPreview)
        } catch (error) {
          console.error(error)
          setImagePreview(null)
        }
      } else if (prevImageUrl) {
        setImagePreview(prevImageUrl)
      } else {
        setImagePreview(null)
      }
    }

    UpdateImagePreview()
  }, [fileList])

  return (
    <>
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
      {/* Sex */}
      <Controller
        control={control}
        name="sex"
        render={({ field: { onChange } }) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor="sex"
                className={isSubmitting ? 'cursor-wait' : ''}
              >
                Sexo
              </Label>
              {errors.sex && (
                <span className="text-xs text-destructive">
                  {errors.sex.message}
                </span>
              )}
            </div>
            <RadioGroup
              onValueChange={onChange}
              className="flex gap-4"
              id="sex"
              defaultValue={sex}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Macho"
                  id="Macho"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                />
                <Label
                  htmlFor="Macho"
                  className={isSubmitting ? 'cursor-wait' : ''}
                >
                  Macho
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Fêmea"
                  id="Fêmea"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                />
                <Label
                  htmlFor="Fêmea"
                  className={isSubmitting ? 'cursor-wait' : ''}
                >
                  Fêmea
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
      />

      {/* Size */}
      <Controller
        control={control}
        name="size"
        render={({ field: { onChange } }) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label
                className={isSubmitting ? 'cursor-wait' : ''}
                htmlFor="size"
              >
                Porte
              </Label>
              {errors.size && (
                <span className="text-xs text-destructive">
                  {errors.size.message}
                </span>
              )}
            </div>
            <RadioGroup
              onValueChange={onChange}
              className="flex gap-4"
              id="size"
              defaultValue={size}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Grande"
                  id="Grande"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                />
                <Label
                  htmlFor="Grande"
                  className={isSubmitting ? 'cursor-wait' : ''}
                >
                  Grande
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Médio"
                  id="Médio"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                />
                <Label
                  htmlFor="Médio"
                  className={isSubmitting ? 'cursor-wait' : ''}
                >
                  Médio
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="Pequeno"
                  id="Pequeno"
                  disabled={isSubmitting}
                  className="disabled:cursor-wait"
                />
                <Label
                  htmlFor="Pequeno"
                  className={isSubmitting ? 'cursor-wait' : ''}
                >
                  Pequeno
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
      />
      {newAnimalInputs.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Label
                htmlFor={item.id}
                className={isSubmitting ? 'cursor-wait' : ''}
              >
                {item.label}
              </Label>
              {errors[item.id as keyof AnimalForm] && (
                <span className="text-xs text-destructive">
                  {errors[item.id as keyof AnimalForm]?.message}
                </span>
              )}
            </div>
            <Input
              id={item.id}
              type={item.type}
              {...register(item.id as keyof AnimalForm)}
              disabled={isSubmitting}
              className="disabled:cursor-wait"
            />
          </div>
        )
      })}
    </>
  )
}
