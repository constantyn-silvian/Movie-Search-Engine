import './App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites' 
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import SingUpPage from './pages/SignUpPage.jsx'
import SingInPage from './pages/SignInPage.jsx'
export default function App() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800 min-h-screen text-white">
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/favorites' element={<Favorites />}/>
          <Route path='/signin' element={<SingInPage />}/>
          <Route path='/signup' element={<SingUpPage />}/>
        </Routes>
      </main>
    </div>
  )
}

