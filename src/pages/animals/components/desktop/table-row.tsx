import { Edit, Trash } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { useAnimals } from '@/hooks/use-animals'

// import { Form } from '../common/form'

export interface AnimalsTableRowProps {
  id: string
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
  const { handleDeleteAnimal } = useAnimals()
  return (
    <TableRow>
      <TableCell className="font-medium">
        <img src={avatar} alt="Avatar" className="h-40 w-40 object-cover" />
      </TableCell>
      <TableCell className="text-2xl font-black tracking-tight text-primary">
        {name}
      </TableCell>
      <TableCell className="font-medium">{sex}</TableCell>
      <TableCell className="font-medium">{size}</TableCell>
      <TableCell className="font-medium">{weight}</TableCell>
      <TableCell className="font-medium">{address}</TableCell>
      <TableCell className="font-medium">{protectorName}</TableCell>
      <TableCell className="font-medium">{contact}</TableCell>
      <TableCell className="">
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Edit />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar animal</DialogTitle>
                <DialogDescription>
                  Edite as informações do animal cadastrado
                </DialogDescription>
              </DialogHeader>
              {/* <Form /> */}
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir{' '}
                  <span className="text-2xl text-primary">{name}</span>?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Essa ação não pode ser desfeita. Ela vai excluir o registro do
                  catálogo de animais para adoção de forma permanente
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDeleteAnimal(id)}>
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  )
}
