import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '@/../firebase'

import { AnimalsHeader } from './components/common/header'
import { AnimalsTable } from './components/desktop/table'
import { AnimalsTableRowProps } from './components/desktop/table-row'

export function Animals() {
  const [data, setData] = useState<AnimalsTableRowProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list: AnimalsTableRowProps[] = []

      try {
        const querySnapshot = await getDocs(collection(db, 'animals'))
        querySnapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          })
        })
        setData(list)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <AnimalsHeader />
      <AnimalsTable animals={data} isLoading={false} />
    </div>
  )
}
