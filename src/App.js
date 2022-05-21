import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Purchase from '../src/Pages/Purchase/Purchase'
import Blog from '../src/Pages/Blog/Blog'
import Login from '../src/Pages/Login/Login'
import NotFound from '../src/Pages/NotFound/NotFound'
import Header from './Shared/Header'


const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/purchase' element={<Purchase/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App