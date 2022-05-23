import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Blog from '../src/Pages/Blog/Blog'
import Login from '../src/Pages/Login/Login'
import NotFound from '../src/Pages/NotFound/NotFound'
import Header from './Shared/Header'
import SignUp from './Pages/Login/SignUp'
import ItemDetails from './Pages/Home/ItemDetails'
import { Toaster } from 'react-hot-toast';
import RequireAuth from './Pages/Login/RequireAuth'


const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/purchase/:id' element={<RequireAuth>
          <ItemDetails/>
        </RequireAuth>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster></Toaster>
    </div>
  )
}

export default App