import { TableCell, TableRow } from '@/components/ui/table'

export interface UsersTableRowProps {
  id?: string
  name?: string
  email?: string
}

export function UsersTableRow({ id, name, email }: UsersTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{email}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
