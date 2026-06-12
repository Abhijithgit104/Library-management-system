import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes,Route } from 'react-router-dom'
// import './App.css'
import Login from './components/Login'
import Register from './components/Regiister'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import { Link } from "react-router-dom";
import BookList from './components/BookList'
import EditBook from './components/Editbook'
import CreateBook from './components/Createbook'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div>
     <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path ='/books' element={<BookList/>}   /> 
      <Route path ='/edit' element={<EditBook/>}   /> 
      <Route path ='/create' element={<CreateBook/>}   /> 
      
     </Routes>
     </div>
    </>
  )
}

export default App
