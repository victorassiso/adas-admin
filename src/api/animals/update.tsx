import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/../firebase'

import { uploadFile } from '../upload-file'
import { CreateAnimalProps } from './create'

export interface UpdateAnimalProps extends Omit<CreateAnimalProps, 'avatar'> {
  id: string
  avatar: string | File
}

export async function updateAnimal(data: UpdateAnimalProps) {
  let avatar: string

  if (data.avatar instanceof File) {
    // Upload new image
    avatar = await uploadFile(data.avatar)
    // Delete old image
    // TODO: ...
  } else {
    // Keep the same image reference
    avatar = data.avatar
  }

  const { id, ...updateData } = data
  await updateDoc(doc(db, 'animals', id), { ...updateData, avatar })
}
