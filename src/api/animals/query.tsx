import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/../firebase'
import { AnimalsTableRowProps } from '@/pages/animals/components/desktop/table-row'

export async function queryAnimals() {
  const list: AnimalsTableRowProps[] = []

  const querySnapshot = await getDocs(collection(db, 'animals'))
  querySnapshot.forEach((doc) => {
    list.push({
      id: doc.id,
      avatar: doc.data().avatar || '',
      name: doc.data().name || '',
      sex: doc.data().sex || 'Fêmea',
      size: doc.data().size || 'Médio',
      weight: doc.data().weight || 0,
      address: doc.data().address || '',
      protectorName: doc.data().protectorName || '',
      contact: doc.data().contact || '',
    })
  })
  return list
}
