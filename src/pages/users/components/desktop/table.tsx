import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { UsersTableRow, UsersTableRowProps } from './table-row'
import { TableSkeleton } from './table-skeleton'

interface UsersTableProps {
  users: UsersTableRowProps[]
  isLoading: boolean
}

export function UsersTable({ users, isLoading }: UsersTableProps) {
  return (
    <div className="rounded-md border ">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 rounded-tl-md">Identificador</TableHead>
            <TableHead className="w-1/4">Nome</TableHead>
            <TableHead className="w-1/4">Email</TableHead>
            <TableHead className="w-1/4 rounded-tr-md"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableSkeleton />}
          {users &&
            users.map((user) => {
              return (
                <UsersTableRow
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                />
              )
            })}
        </TableBody>
      </Table>
    </div>
  )
}
