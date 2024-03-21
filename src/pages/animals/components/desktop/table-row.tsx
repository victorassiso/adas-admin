import { TableCell, TableRow } from '@/components/ui/table'

export interface AnimalsTableRowProps {
  id?: string
  avatar?: string
  name?: string
  sex?: 'Macho' | 'Fêmea'
  size?: 'Grande' | 'Médio' | 'Pequeno'
  weight?: number
  address?: string
  protectorName?: string
  contact?: string
}

export function AnimalsTableRow({
  id,
  avatar,
  name,
  sex,
  size,
  weight,
  address,
  protectorName,
  contact,
}: AnimalsTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-mono text-xs font-medium">{id}</TableCell>
      <TableCell className="font-medium">
        <img src={avatar} alt="Avatar" className="h-40 w-40 object-cover" />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="font-medium">{sex}</TableCell>
      <TableCell className="font-medium">{size}</TableCell>
      <TableCell className="font-medium">{weight}</TableCell>
      <TableCell className="font-medium">{address}</TableCell>
      <TableCell className="font-medium">{protectorName}</TableCell>
      <TableCell className="font-medium">{contact}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  )
}
