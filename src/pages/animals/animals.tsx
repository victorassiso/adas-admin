import { AnimalsContextProvider } from '@/contexts/animals'

import { AnimalsHeader } from './components/common/header'
import { AnimalsTable } from './components/desktop/table'

export function Animals() {
  return (
    <div className="flex flex-col gap-8">
      <AnimalsContextProvider>
        <AnimalsHeader />
        <AnimalsTable />
      </AnimalsContextProvider>
    </div>
  )
}
