import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { db } from '@/../firebase'

import { UsersHeader } from './components/common/users-header'

export function Users() {
  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list: any = []

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

  console.log({ users: data })
  return (
    <div>
      <UsersHeader />
      <h3>Table</h3>
    </div>
  )
}
