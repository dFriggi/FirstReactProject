import { useState, useEffect } from 'react'
import axios from 'axios'
import { set, useForm } from 'react-hook-form'
import { Button } from './ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const LoginPage = ({ onLogin }) => {
    const { register:registerReg, handleSubmit:handleSubmitReg, formState: { errors:errorsReg }, reset} = useForm()
    const { register:registerLogin, handleSubmit:handleSubmitLogin, formState: { errors:errorsLog }} = useForm()

    const API_URL = 'http://localhost:5000/login'

    const onSubmitReg = async(data) => {
        const newLogin = {
            email: data.emailReg,
            password: data.passwordReg
        }
        try {
            await axios.post(`${API_URL}/register`, newLogin)
            alert("Conta criada com sucesso! Agora faça login.");
            reset() 
        } catch (err) {
            console.error(err.response?.data?.message || 'Erro desconhecido');
        } 
    }

    const onSubmitLog = async(data) => {
        const loginData = {
            email: data.emailLogin,
            password: data.passwordLogin
        }
        try {
            const dados = await axios.post(API_URL, loginData)
            console.log(dados);
            onLogin(true)  
        } catch (err) {
            console.error(err.response?.data?.message || 'Erro desconhecido');
        }    
    }

    return (
        <div className="w-full flex items-center justify-center p-4 gap-20">
            <Card className="w-full max-w-sm flex justify-center shadow-2xl">
                <CardHeader>
                  <CardTitle>Ainda não tem uma conta? Registre-se aqui:</CardTitle>
                  <CardDescription>
                    Coloque um email e uma senha
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmitReg(onSubmitReg)}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...registerReg("emailReg", { required: 'Email é obrigatório' })}
                          type="email"
                          placeholder="m@example.com"
                        />
                        {errorsReg.emailReg &&<p className='text-red-500 text-xs'>{errorsReg.emailReg.message}</p>}
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Senha</Label>
                        </div>
                        <Input 
                        {...registerReg("passwordReg", { required: 'Senha é obrigatória' })}
                        id="password"
                        type="password"
                        />
                        {errorsReg.passwordReg &&<p className='text-red-500 text-xs'>{errorsReg.passwordReg.message}</p>}
                      </div>
                    </div>

                    <CardFooter className="flex-col gap-2">
                      <Button type="submit" className="w-full">
                        Registrar
                      </Button>
                    </CardFooter>
                  </form>
                </CardContent>
            </Card>

            <Card className="w-full max-w-sm flex justify-center shadow-2xl">
                <CardHeader>
                  <CardTitle>Faça login</CardTitle>
                  <CardDescription>
                    Coloque seu email e senha para logar em sua conta
                  </CardDescription>
                </CardHeader>
        
                <CardContent>
                  <form onSubmit={handleSubmitLogin(onSubmitLog)}>
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          {...registerLogin("emailLogin", { required: 'Email é obrigatório' })}
                          type="email"
                          placeholder="m@example.com"
                        />
                        {errorsLog.emailLogin &&<p className='text-red-500 text-xs'>{errorsLog.emailLogin.message}</p>}
                      </div>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Senha</Label>
                        </div>
                        <Input 
                        {...registerLogin("passwordLogin", { required: 'Senha é obrigatória' })}
                        id="password"
                        type="password"
                        />
                        {errorsLog.passwordLogin &&<p className='text-red-500 text-xs'>{errorsLog.passwordLogin.message}</p>}
                      </div>
                    </div>
                    <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full">
                        Login
                     </Button>
                    </CardFooter>
                  </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginPage