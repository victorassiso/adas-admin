import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

import { db } from '@/../firebase'
import { Animal } from '@/models/animals'

export async function createAnimal(data: Omit<Animal, 'id'>) {
  const newAnimalRef = await addDoc(collection(db, 'animals'), {
    ...data,
    timeStamp: serverTimestamp(),
  }).catch((err) => {
    console.log(err)
  })

  return newAnimalRef
}
