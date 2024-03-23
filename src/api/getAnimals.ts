import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/../firebase'
import { Animal } from '@/models/animals'

export async function getAnimals() {
  const list: Animal[] = []

  try {
    const querySnapshot = await getDocs(collection(db, 'animals'))

    querySnapshot.forEach((doc) => {
      list.push({
        id: doc.id,
        ...doc.data(),
      })
    })

    return list
  } catch (err) {
    console.log(err)
  }
}
