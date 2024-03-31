import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/../firebase'

import { uploadFile } from '../upload-file'

export interface CreateAnimalProps {
  avatar: File
  name: string
  sex: 'Macho' | 'Fêmea'
  size: 'Grande' | 'Médio' | 'Pequeno'
  weight: number
  address: string
  protectorName: string
  contact: string
}

export async function createNewAnimal(data: CreateAnimalProps) {
  const avatar = await uploadFile(data.avatar)

  const newProductRef = await addDoc(collection(db, 'animals'), {
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

  console.log(newProductRef)

  return newProductRef
}
