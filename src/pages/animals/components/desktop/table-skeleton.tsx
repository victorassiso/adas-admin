import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function TableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-2 w-10" />
        </TableCell>
      </TableRow>
    )
  })
}
