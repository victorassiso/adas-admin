import { useAnimals } from '@/hooks/use-animals'

import { AnimalsHeader } from './components/common/header'
import { AnimalsTable } from './components/desktop/table'

export function Animals() {
  // const [data, setData] = useState<AnimalsTableRowProps[]>([])
  const { animalsState } = useAnimals()
  const data = animalsState?.animals

  return (
    <div className="flex flex-col gap-8">
      <AnimalsHeader />
      <AnimalsTable animals={data} isLoading={false} />
    </div>
  )
}
