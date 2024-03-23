import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/../firebase'
import { Animal } from '@/models/animals'

export async function updateAnimal(animal: Animal) {
  const data: Omit<Animal, 'id'> = animal
  console.log({ data })
  try {
    await updateDoc(doc(db, 'animals', animal.id), {
      ...data,
    })
  } catch (e) {
    console.error('Update failed: ', e)
  }
}
