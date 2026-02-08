import { useState } from 'react'
import Navbar from './components/Navbar'
import LoginPage from './components/Login'
import Home from './pages/Home'
import Hello from './pages/Hello'
import Manager from './pages/Manager'
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

        <main className="container mx-auto p-4 md:p-5">
          
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hello' element={<Hello />} />
            <Route path='/manager' element={<Manager/>}></Route>
          </Routes>

        </main>
      </div>
    </div>
    </>
  )
}

export default App
