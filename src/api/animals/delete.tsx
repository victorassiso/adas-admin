import { deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/../firebase'

export async function deleteAnimal(id: string) {
  await deleteDoc(doc(db, 'animals', id))
}
