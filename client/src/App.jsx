import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './components/Login'
import Home from './pages/Home'
import Hello from './pages/Hello'
import { Routes, Route } from 'react-router-dom'


function App() {
  const [currentLogin, setCurrentLogin] = useState(null)

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
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gerenciador de Usuários</h1>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hello' element={<Hello />} />
          </Routes>

        </main>
      </div>
    </div>
    </>
  )
}

export default App
