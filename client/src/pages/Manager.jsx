import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Button } from '../components/ui/button'

function Manager() {
  const [users, setUsers] = useState([])
  const [lastAdd, setLastAdd] = useState(null)
  
  const { register, handleSubmit, formState: { errors }, reset, setValue} = useForm()

  const API_URL = 'http://localhost:5000/users'

  const onSubmit = async(data) => {
    const newUser = {
      name: data.userName,
      email: data.userEmail
    }

    try{
      await axios.post(API_URL, newUser)
        
      setLastAdd(newUser.name)
      reset()
    } catch(err) {
      console.error(err.response?.data?.message || 'Erro desconhecido');
    }
  }

  return (
    <>
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gerenciador de Usuários</h1>

    <div className="flex flex-col justify-center w-full items-center">
        <div className="bg-white p-6 rounded-lg shadow-md h-fit items-center justify-center w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
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
              {errors.userName &&<p className='text-red-500 text-xs p-2'>{errors.userName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                {...register("userEmail", { required: 'Email é obrigatório' })}
                type="email" 
                placeholder="Digite o email..."
                className="text-gray-800 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.userEmail &&<p className='text-red-500 text-xs p-2'>{errors.userEmail.message}</p>}
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

        <div>
            
        </div>
            {lastAdd && <p className='text-green-600 text-s p-2 mt-5 bg-green-300/60 rounded-sm'>{lastAdd} foi adicionado a lista com sucesso!</p>}
        </div>
    </>
  )
}

export default Manager
