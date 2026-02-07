import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import LoginPage from './components/Login'
import { set, useForm } from 'react-hook-form'
import { Button } from './components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

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

function App() {
  const [currentLogin, setCurrentLogin] = useState(null)
  const [users, setUsers] = useState([])
  const [searchUsers, setSearchUsers] = useState('')
  

  const { register, handleSubmit, formState: { errors }, reset, setValue} = useForm()

  const API_URL = 'http://localhost:5000/users'

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async() => {
    try {
      const resp = await axios.get(API_URL)
      setUsers(resp.data)
    } catch (err) {
      console.error('Erro ao buscar usuários', err);
    }
  }

  const onSubmit = async(data) => {
    const newUser = {
      name: data.userName,
      email: data.userEmail
    }
    try{
      await axios.post(API_URL, newUser)
    
      reset()
      fetchUsers()

    } catch(err) {
      console.error(err.response?.data?.message || 'Erro desconhecido');
    }
  }

  const handleDelete = async(id) => {
      try{
        await axios.delete(`${API_URL}/${id}`)
        fetchUsers()
      } catch (err) {
        console.error('Erro ao deletar', err);
      }
  }

  const filteredUsers = users.filter((user) => {
     return user.name.toLowerCase().includes(searchUsers.toLowerCase())
  })

  const List = () => {
    const listUsers = filteredUsers.map((user) => 
        <li key={user._id} className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-gray-50 rounded transition">
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{user.name}</span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
          
          <div className="flex gap-2">

              <EditDialog user={user} refreshUsers={fetchUsers}/>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-400"
                    title="Deletar"
                  >
                    🗑️
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Essa ação não pode ser desfeita. Isso excluirá permanentemente o usuário <b>{user.name}</b>.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      Sim, deletar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </li>
      ) 
    return(
    <ul className="space-y-3">
      {listUsers}
    </ul>
    )
  }

  return (
    <>
    <div className="relative min-h-screen min-w-screen bg-gray-100 font-sans overflow-hidden">

      {!currentLogin && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
          <LoginPage onLogin={setCurrentLogin}/>
        </div>
      )}


      <div className="min-h-screen min-w-screen bg-gray-100 font-sans">

        <Navbar onLogout={setCurrentLogin}/>

        <main className="container mx-auto p-4 md:p-8">

          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Gerenciador de Usuários
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Novo Usuário
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                  <input
                    {...register("userName", { required: 'Nome é obrigatório' })} 
                    type="text" 
                    placeholder="Digite o nome..."
                    className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
                  />
                  {errors.userName &&<p className='text-red-500 text-xs'>{errors.userName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <input
                    {...register("userEmail", { required: 'Email é obrigatório' })}
                    type="email" 
                    placeholder="Digite o email..."
                    className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.userEmail &&<p className='text-red-500 text-xs'>{errors.userEmail.message}</p>}
                </div>

                <div className="flex gap-2 mt-2">
                  <Button
                    variant='ghost' 
                    type='submit' 
                    className='flex-1 py-2 px-4 rounded text-white transition bg-gray-800 hover:bg-gray-400'
                  >
                  Cadastrar
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">Lista de Usuários</h2>

              <div className='mb-4'>
                <input
                  type='text'
                  value={searchUsers}
                  onChange={(e) => setSearchUsers(e.target.value)}
                  placeholder='Filtro por nome...'
                  className='text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
                >
                </input>
              </div>

              {filteredUsers.length === 0 ? (
                <p className="text-gray-500 italic">Nenhum usuário encontrado.</p>
              ) : (
                <List />
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
    </>
  )
}

export default App
