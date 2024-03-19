import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { AnimalsTableRow, AnimalsTableRowProps } from './table-row'
import { TableSkeleton } from './table-skeleton'

interface AnimalsTableProps {
  animals: AnimalsTableRowProps[]
  isLoading: boolean
}

export function AnimalsTable({ animals, isLoading }: AnimalsTableProps) {
  return (
    <div className="rounded-md border ">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/12 rounded-tl-md">
              Identificador
            </TableHead>
            <TableHead className="w-1/12">Nome</TableHead>
            <TableHead className="w-1/12">Sexo</TableHead>
            <TableHead className="w-1/12">Porte</TableHead>
            <TableHead className="w-1/12">Peso</TableHead>
            <TableHead className="w-1/12">Endereço</TableHead>
            <TableHead className="w-1/12">Protetor</TableHead>
            <TableHead className="w-3/12">Contato</TableHead>
            <TableHead className="w-4 rounded-tr-md"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableSkeleton />}
          {animals &&
            animals.map((animal) => {
              return (
                <AnimalsTableRow
                  key={animal.id}
                  id={animal.id}
                  name={animal.name}
                  sex={animal.sex}
                  size={animal.size}
                  weight={animal.weight}
                  address={animal.address}
                  protectorName={animal.protectorName}
                  contact={animal.contact}
                />
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
