import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../src/Pages/Home/Home'
import Blog from '../src/Pages/Blog/Blog'
import Login from '../src/Pages/Login/Login'
import NotFound from '../src/Pages/NotFound/NotFound'
import Header from './Shared/Header'
import SignUp from './Pages/Login/SignUp'
import { Toaster } from 'react-hot-toast';
import RequireAuth from './Pages/Login/RequireAuth'
import Purchase from './Pages/Purchase/Purchase'
import Dashboard from './Pages/Dashboard/Dashboard'
import MyOrder from './Pages/Dashboard/MyOrder'
import AddReview from './Pages/Dashboard/AddReview'
import MyProfile from './Pages/Dashboard/MyProfile'
import MakeAdmin from './Pages/Dashboard/MakeAdmin'
import AddProduct from './Pages/Dashboard/AddProduct'
import ManageProducts from './Pages/Dashboard/ManageProducts'
import ManageOrders from './Pages/Dashboard/ManageOrders'


const App = () => {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/purchase/:id' element={<RequireAuth>
          <Purchase/>
        </RequireAuth>}/>
        <Route path='/dashboard' element={<RequireAuth>
          <Dashboard/>
        </RequireAuth>}>
          <Route index element={<MyOrder/>}/>
          <Route path='addreview' element={<AddReview/>}/>
          <Route path='profile' element={<MyProfile/>}/>
          <Route path='makeadmin' element={<MakeAdmin/>}/>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='manageproduct' element={<ManageProducts/>}/>
          <Route path='manageorder' element={<ManageOrders/>}/>
        </Route>
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