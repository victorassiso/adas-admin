import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/../firebase'

import { uploadFile } from '../upload-file'
import { CreateAnimalRequest } from './create'

export interface UpdateAnimalRequest
  extends Omit<CreateAnimalRequest, 'avatar'> {
  id: string
  avatar: string | File
}

export async function updateAnimal(data: UpdateAnimalRequest) {
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

  return {
    ...data,
    avatar,
  }
}
