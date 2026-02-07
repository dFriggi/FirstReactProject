import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button'


const EditDialog = ({ user, refreshUsers }) => {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      userName: user.name,
      userEmail: user.email
    }
  })

  const API_URL = 'http://localhost:5000/users'

  const onSubmitEdit = async(data) => {
    try {
      await axios.put(`${API_URL}/${user._id}`, { name: data.userName, email: data.userEmail})
      refreshUsers()
      setOpen(false)
    } catch (err) {
      console.error('Erro ao editar', err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-gray-500"
          title="Editar"
        >
        ✏️
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            Faça mudanças no usuário. Ao terminar, clique em salvar.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmitEdit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input {...register("userName", { required: 'Nome é obrigatório' })} 
                type="text" 
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input {...register("userEmail", { required: 'Email é obrigatório' })}
                type="email" 
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog