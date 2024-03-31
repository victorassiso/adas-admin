import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '@/../firebase'

import { UsersHeader } from './components/common/header'
import { UsersTable } from './components/desktop/table'
import { UsersTableRowProps } from './components/desktop/table-row'

export function Users() {
  const [data, setData] = useState<UsersTableRowProps[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const list: UsersTableRowProps[] = []

      try {
        const querySnapshot = await getDocs(collection(db, 'users'))
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
      <UsersHeader />
      <UsersTable users={data} isLoading={false} />
    </div>
  )
}
