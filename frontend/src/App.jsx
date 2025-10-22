import './App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites' 
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
export default function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/favorites' element={<Favorites />}/>
        </Routes>
      </main>
    </div>
  )
}

