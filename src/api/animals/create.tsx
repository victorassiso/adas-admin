import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/../firebase'

import { uploadFile } from '../upload-file'

export interface CreateAnimalRequest {
  avatar: File
  name: string
  sex: 'Macho' | 'Fêmea'
  size: 'Grande' | 'Médio' | 'Pequeno'
  weight: number
  address: string
  protectorName: string
  contact: string
}

export async function createAnimal(data: CreateAnimalRequest) {
  const avatar = await uploadFile(data.avatar)

  const docRef = await addDoc(collection(db, 'animals'), {
    avatar,
    name: data.name,
    sex: data.sex,
    size: data.size,
    weight: data.weight,
    address: data.address,
    protectorName: data.protectorName,
    contact: data.contact,
    timeStamp: serverTimestamp(),
  })

  return {
    ...data,
    id: docRef.id,
    avatar,
  }
}
